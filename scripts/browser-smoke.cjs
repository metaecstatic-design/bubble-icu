const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { join } = require('node:path');
const { chromium } = require('playwright');

async function checkWorkflow(browser, viewport) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(pathToFileURL(join(__dirname, '..', 'index.html')).href);
    assert.equal(await page.locator('#title').textContent(), 'Overview');
    await page.getByRole('button', { name: 'Start walkthrough', exact: true }).click();
    const titles = ['Overview', 'Overview', 'Nursing', 'Nursing', 'Nursing', 'Actions', 'Activity Log'];
    const nursingViews = { 2: 'Recorded nursing observations', 3: 'Ventilator and respiratory support', 4: 'Documented total:' };
    for (let step = 0; step < titles.length; step++) {
      assert.equal(await page.locator('#title').textContent(), titles[step]);
      assert.ok((await page.locator('#walkthroughText').textContent()).startsWith(`Step ${step + 1} of 7`));
      assert.ok((await page.locator('#content').textContent()).trim());
      if (nursingViews[step]) assert.ok((await page.locator('#content').textContent()).includes(nursingViews[step]));
      if (step === 1) assert.equal(await page.locator('#drawer').isVisible(), true);
      const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      assert.ok(fits, `Page overflow at step ${step + 1}, width ${viewport.width}`);
      if (step < titles.length - 1) await page.getByRole('button', { name: 'Next step', exact: true }).click();
    }
    await page.getByRole('button', { name: 'Finish walkthrough', exact: true }).click();
    assert.equal(await page.locator('#startWalkthrough').isVisible(), true);
    await page.locator('[data-trend="HR"]').click();
    assert.equal(await page.locator('#title').textContent(), 'Nursing');
    assert.ok((await page.locator('#content').textContent()).includes('Recorded nursing observations'));
    await page.locator('#globalSearch').fill('potassium');
    assert.equal(await page.locator('#searchResults').isVisible(), true);
    const currentWard = await page.locator('#ward').inputValue();
    const wards = await page.locator('#ward option').evaluateAll(options => options.map(option => option.value));
    await page.locator('#ward').selectOption(wards.find(ward => ward !== currentWard));
    assert.equal(await page.locator('#searchResults').isVisible(), false);
    assert.equal(await page.locator('#globalSearch').inputValue(), '');
    assert.deepEqual(errors, []);
    console.log(`Presentation workflow passed at ${viewport.width} x ${viewport.height}`);
  } finally {
    await page.close();
  }
}

(async () => {
  const browser = await chromium.launch();
  try {
    for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
      await checkWorkflow(browser, viewport);
    }
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
