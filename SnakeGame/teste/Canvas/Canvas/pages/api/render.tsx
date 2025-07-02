import type {NextApiRequest, NextApiResponse} from "next";
import puppeteer, {type Browser} from "puppeteer";
import {Flashcard} from "../../components/flashcard";

/* ---------------------------------------------------------------------------------------------- */

const BROWSER_POOL: Browser[] = [];

async function get_browser(): Promise<Browser> {
  let browser: (Browser | null) = null;

  if (BROWSER_POOL.length < 4) {
    browser = await puppeteer.launch({
      headless: true,
    });
  }

  // Get and return next browser, send reference
  browser = (browser || BROWSER_POOL.shift()!);
  BROWSER_POOL.push(browser);
  return browser;
}

/* ---------------------------------------------------------------------------------------------- */

class RenderConfig {
  flashcard: Flashcard
  scale: number

  constructor(config: Partial<RenderConfig> = {}) {
    this.flashcard = new Flashcard(config.flashcard);
    this.scale = (config.scale ?? 6);
  }
}

/* ---------------------------------------------------------------------------------------------- */


export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  // Parse the request body
  let config: RenderConfig = new RenderConfig(request.body)

  const browser = await get_browser()
  const page = await browser.newPage()

  await page.setViewport({
    deviceScaleFactor: (config.scale),
    width: 1920, height: 1080,
  })

  const url = `http://localhost:${process.env.PORT}/custom?flashcard=${
    encodeURIComponent(JSON.stringify(config.flashcard))
  }`;

  // Load the page and take a screenshot
  await page.goto(url, {waitUntil: "networkidle0"});
  await page.waitForSelector(".flashcard-root");

  // Find the flashcard element
  const flashcardElement = await page.$(".flashcard-root")
  const screenshot = await flashcardElement!.screenshot({
    omitBackground: true,
    type: "png",
  })
  // const screenshot = await page.screenshot({
  //   optimizeForSpeed: true,
  //   omitBackground: true,
  //   type: "jpeg",
  // })
  await page.close()

  // Return the screenshot data
  response.setHeader("Content-Type", "image/png")
  // response.send(screenshot)
  response.send(Buffer.from(screenshot))
}

