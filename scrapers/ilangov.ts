import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeIlanGov() {
    console.log('Scraping İlan.gov.tr...');
    try {
        const { data } = await axios.get('https://www.ilan.gov.tr/ilan/kategori/44/kamu-personel-alim-ve-sinavlari');
        const $ = cheerio.load(data);
        const jobs: any[] = [];
        $('.ilan-item').each((i, el) => {
            jobs.push({
                title: $(el).text().trim(),
                original_url: 'https://www.ilan.gov.tr' + $(el).find('a').attr('href')
            });
        });
        return jobs;
    } catch (error) {
        console.error('İlan.gov.tr error:', error);
        return [];
    }
}
