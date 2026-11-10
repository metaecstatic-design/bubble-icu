# Presenting Bubble ICU

Open `index.html` in a modern browser and select **Start walkthrough**. The demo uses embedded fictional records and runs directly from the file. Opening the GitHub source view displays the code. Download the individual HTML file with the Raw download control to run it locally.

The walkthrough takes about three minutes and starts with the first fictional ICU patient. Use **Next step** to move through the seven views.

1. Check the selected patient, admission context and allergies in Overview.
2. Inspect the alert details and compact trends. Select HR to see the recorded nursing observations, or a laboratory trend to see its pathology group.
3. Review the nursing observation times and values. On a phone, swipe the table sideways.
4. Inspect the documented respiratory support and ventilator settings.
5. Compare the fluid input and output totals.
6. Review the outstanding recommendations and their status for handover.
7. Finish with the chronological activity log.

Select **Finish walkthrough** to return to exploration. The location and patient selectors let you inspect other fictional charts. Start the walkthrough again to return to the first ICU case.

## Readiness for 24 November 2026

The candidate should pass the automated presentation path at desktop and phone widths and be rehearsed on the actual presentation device. A hosted launch link still needs an approved hosting step. Review the foundation PR and the stacked candidate PR before merging.

## Developer verification

Run `npm test` with Node.js 20 or later. GitHub checks also install Playwright 1.56.1 in the temporary runner and exercise the presentation path in Chromium at 1280, 390 and 320 pixel widths. To run that check locally, install that Playwright version, run `npx playwright install chromium`, then `node scripts/browser-smoke.cjs`.
