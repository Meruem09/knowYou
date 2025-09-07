import express from 'express'
import puppeteer from 'puppeteer';
const router = express.Router()

async function fetchProfile(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the name element (use h1 instead of class)
    await page.waitForSelector('h1');

    const profileData = await page.evaluate(() => {
      const name =
        document.querySelector('h1')?.innerText.trim() || '';

      const headline =
        document.querySelector('div.text-body-medium')?.innerText.trim() || '';

      const location =
        document.querySelector('span.text-body-small')?.innerText.trim() || '';

      return { name, headline, location };
    });

    return profileData;
  } catch (error) {
    console.error('Error scraping profile:', error);
    return null;
  } finally {
    await browser.close();
  }
}


router.post('/',async (req,res)=>{
    const {url} = req.body;
    if(!url.includes("linkedin.com/in/")){
        return res.status(400).json({error: "Invalid url of profile"});
    }
    const data = await fetchProfile(url)
    res.json(data);
})

export default router;