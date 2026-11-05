import { chromium } from 'playwright';

export async function scrapeMemurlarNet() {
    console.log('Scraping Memurlar.net with Playwright...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'tr-TR'
    });
    const page = await context.newPage();
    
    try {
        await page.goto('https://ilan.memurlar.net/', { waitUntil: 'networkidle', timeout: 30000 });
        
        const jobs = await page.evaluate(() => {
            const results: any[] = [];
            const rows = document.querySelectorAll('table tr');
            rows.forEach(row => {
                const link = row.querySelector('a');
                if (link && link.href.includes('/ilan/')) {
                    results.push({
                        title: link.innerText.trim(),
                        institution: 'Memurlar.net',
                        original_url: link.href,
                        source_name: 'memurlar.net'
                    });
                }
            });
            return results;
        });
        
        return jobs.slice(0, 20);
    } catch (error) {
        console.error('Memurlar.net Playwright error:', error);
        return [];
    } finally {
        await browser.close();
    }
}
