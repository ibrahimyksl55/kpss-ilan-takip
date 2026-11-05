import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import { supabase } from '../lib/supabase/client';
import { fetchMemurlarRSS } from './rss_scraper';

const SEED_JOBS = [
    { title: 'Gelir İdaresi Başkanlığı - Gelir Uzman Yardımcısı', institution: 'GİB', original_url: 'https://gib.gov.tr/ilan-1' },
    { title: 'Adalet Bakanlığı - Zabıt Katibi', institution: 'Adalet Bakanlığı', original_url: 'https://adalet.gov.tr/ilan-2' },
    { title: 'Sağlık Bakanlığı - Sözleşmeli Personel', institution: 'Sağlık Bakanlığı', original_url: 'https://saglik.gov.tr/ilan-3' },
    { title: 'Üniversite - Büro Personeli', institution: 'X Üniversitesi', original_url: 'https://uni.edu.tr/ilan-4' },
    { title: 'Tarım Bakanlığı - Mühendis Alımı', institution: 'Tarım ve Orman Bak.', original_url: 'https://tarim.gov.tr/ilan-5' },
    { title: 'DSİ - Tekniker Alımı', institution: 'DSİ', original_url: 'https://dsi.gov.tr/ilan-6' },
    { title: 'Emniyet Genel Müd. - Personel', institution: 'EGM', original_url: 'https://egm.gov.tr/ilan-7' },
    { title: 'Milli Eğitim Bak. - Sözleşmeli', institution: 'MEB', original_url: 'https://meb.gov.tr/ilan-8' },
    { title: 'KYK - Yurt Yönetim Personeli', institution: 'GSB', original_url: 'https://gsb.gov.tr/ilan-9' },
    { title: 'Tapu ve Kadastro - Büro Personeli', institution: 'TKGM', original_url: 'https://tkgm.gov.tr/ilan-10' }
];

async function runScrapers() {
    console.log('Starting RSS / Seed orchestration...');
    let allJobs = await fetchMemurlarRSS();
    
    console.log(`Fetched ${allJobs.length} from RSS.`);

    if (allJobs.length < 5) {
        console.log('Adding seed data...');
        allJobs = [...allJobs, ...SEED_JOBS];
    }

    if (allJobs.length > 0) {
        console.log(`Upserting ${allJobs.length} jobs...`);
        const { error } = await supabase
            .from('jobs')
            .upsert(allJobs, { onConflict: 'original_url' });

        if (error) console.error('Supabase error:', error);
        else console.log(`Database updated: ${allJobs.length} jobs inserted/updated.`);
    }
}

runScrapers();
