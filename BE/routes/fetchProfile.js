import puppeteer from 'puppeteer';

async function fetchProfile(url) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set a realistic user agent and viewport
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 720 });

    // Block unnecessary resources
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        }
    });

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        const result = await page.evaluate(() => {
            const name = document.querySelector('.text-heading-xlarge')?.innerText || 'N/A';
            const headline = document.querySelector('.text-body-medium')?.innerText || 'N/A';
            const connections = document.querySelector('.t-black--light')?.innerText || 'N/A';
            return { name, headline, connections };
        });
        return result;
    } catch (error) {
        console.error('Puppeteer error:', error.message);
        throw new Error('Failed to fetch profile');
    } finally {
        await browser.close();
    }
}