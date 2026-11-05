import { chromium } from 'playwright';

export async function scrapeResmiGazete() {
    console.log('Scraping Resmi Gazete with Playwright...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'tr-TR'
    });
    const page = await context.newPage();
    
    try {
        await page.goto('https://www.resmigazete.gov.tr/ilanlar/ilan.htm', { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        await page.waitForSelector('table', { timeout: 10000 });
        
        const jobs = await page.evaluate(() => {
            const results: any[] = [];
            const rows = document.querySelectorAll('table tr');
            rows.forEach(row => {
                const link = row.querySelector('a');
                if (link && link.href) {
                    results.push({
                        title: link.innerText.trim(),
                        institution: 'Resmi Gazete',
                        original_url: link.href.startsWith('http') ? link.href : 'https://www.resmigazete.gov.tr' + link.getAttribute('href'),
                        source_name: 'resmigazete'
                    });
                }
            });
            return results.filter(j => j.title.length > 10);
        });
        
        return jobs.slice(0, 20);
    } catch (error) {
        console.error('Resmi Gazete Playwright error:', error);
        return [];
    } finally {
        await browser.close();
    }
}
