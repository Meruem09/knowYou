import express from 'express'
import puppeteer from 'puppeteer';
const router = express.Router()



async function fetchProfile(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Scrape name, headline, connections, etc.
    const result = await page.evaluate(() => {
        const name = document.querySelector('.text-heading-xlarge')?.innerText;
        const headline = document.querySelector('.text-body-medium')?.innerText;
        const connections = document.querySelector('.t-black--light')?.innerText;
        return { name, headline, connections };
    });

    await browser.close();
    return result;
}



router.post('/',async (req,res)=>{
    const {url} = req.body;
    if(!url.include("linkdin.com/in/")){
        return res.status(400).json({error: "Invalid url of profile"});
    }
    const data = await fetchProfile(url)
    res.json(data);
})

export default router;