import { chromium } from 'playwright';

export async function scrapeKariyerKapisi() {
    console.log('Scraping Kariyer Kapısı...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    try {
        await page.goto('https://kariyerkapisi.gov.tr/isealim');
        // Logic to extract data using Playwright
        const jobs = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.job-card')).map((el: any) => ({
                title: el.innerText,
                original_url: window.location.href
            }));
        });
        return jobs;
    } catch (error) {
        console.error('Kariyer Kapısı error:', error);
        return [];
    } finally {
        await browser.close();
    }
}
