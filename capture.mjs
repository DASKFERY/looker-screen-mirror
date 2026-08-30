import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const screens = [
  {
    id: 1,
    url: "https://datastudio.google.com/embed/reporting/c0c00308-e350-4a66-8e04-91686042ae11/page/KTRUF"
  },
  {
    id: 2,
    url: "https://datastudio.google.com/embed/reporting/473a568a-8bfb-4da8-ab34-8ab63f7b465e/page/KTRUF"
  },
  {
    id: 3,
    url: "https://datastudio.google.com/embed/reporting/6e9dbad9-373f-47d5-932a-ceaa9b2e0075/page/KTRUF"
  },
  {
    id: 4,
    url: "https://datastudio.google.com/reporting/3f4d1c90-1f96-490c-9b6d-68471afd6a56/page/KTRUF"
  },
  {
    id: 5,
    url: "https://lookerstudio.google.com/reporting/7a6af095-c2e2-4f17-a486-7a394f0ae569"
  },
  {
    id: 6,
    url: "https://datastudio.google.com/embed/reporting/c0c00308-e350-4a66-8e04-91686042ae11"
  },
  {
    id: 7,
    url: "https://datastudio.google.com/u/0/reporting/59ad3c0d-f972-4373-bfe9-5fdd4c4a89e2/page/KTRUF"
  },
  {
    id: 8,
    url: "https://datastudio.google.com/u/0/reporting/8c960121-a290-4bf1-ac1c-793b96dec220/page/KTRUF"
  },
  {
    id: 9,
    url: "https://lookerstudio.google.com/reporting/127d88ad-1d6d-43d6-8d38-421bad7831cd"
  },
  {
    id: 10,
    url: "https://datastudio.google.com/embed/reporting/a1a9f205-8585-43eb-a148-d14f9932992e/page/KTRUF"
  }
];

await mkdir("site/screens", { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--disable-dev-shm-usage", "--no-sandbox"]
});

async function captureScreen(screen) {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    locale: "ar-SA",
    timezoneId: "Asia/Riyadh"
  });

  try {
    const page = await context.newPage();
    console.log(`Capturing screen ${screen.id}`);

    await page.goto(screen.url, {
      waitUntil: "domcontentloaded",
      timeout: 120000
    });

    await page.waitForTimeout(30000);

    await page.screenshot({
      path: `site/screens/screen-${screen.id}.png`,
      type: "png",
      fullPage: false
    });
  } finally {
    await context.close();
  }
}

try {
  const batchSize = 3;
  for (let index = 0; index < screens.length; index += batchSize) {
    await Promise.all(screens.slice(index, index + batchSize).map(captureScreen));
  }
} finally {
  await browser.close();
}
