import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'tr-TR,tr;q=0.9',
    'Referer': 'https://www.ilan.gov.tr/'
};

export async function scrapeIlanGov() {
    console.log('Scraping İlan.gov.tr...');
    try {
        const { data } = await axios.get('https://www.ilan.gov.tr/ilan/kategori/44/kamu-personel-alim-ve-sinavlari', { httpsAgent: agent, headers });
        const $ = cheerio.load(data);
        const jobs: any[] = [];
        $('.ilan-item').each((i, el) => {
            const title = $(el).find('a').attr('title');
            if (title) {
                jobs.push({
                    title: title,
                    institution: 'İlan.gov.tr',
                    original_url: 'https://www.ilan.gov.tr' + $(el).find('a').attr('href'),
                    source_name: 'ilan.gov.tr'
                });
            }
        });
        return jobs.slice(0, 20);
    } catch (error) {
        console.error('İlan.gov.tr error:', error);
        return [];
    }
}
