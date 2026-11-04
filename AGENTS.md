# Bubble — instructions for AI coding agents

Scope: private synthetic-only clinical EMR software prototype. **Never ingest, commit or reconstruct real patient records or patient-identifiable screenshots.**

## Architecture
- Work incrementally from `prototype/index.html`; use `data/synthetic-patients.json` for test fixtures.
- Prefer adding small documented modules and tests rather than rewriting the entire app.
- Never connect to Sunrise, bedside monitors, eTG or NALHN PPG without approved interfaces, licensed documents and formal authorisation.
- No automatic prescriptions, orders, administrations or signing. Require authorised human review and source-provenance for clinical inferences.
- Preserve original clinical documentation and distinguish recommended / ordered / administered / completed / unverified.
- Make status and uncertainty visible. Absence of a matching record is **not** proof an action did not happen.

## Priorities
1. React/TypeScript modular single-patient interface, location-based patient selection.
2. Compact trends and configurable clinical lab-order templates (ABG FiO2/pH/PaCO2/PaO2/HCO3/lactate; CBE Hb/WCC/differential/platelets/indices).
3. Nursing observations, ventilator/airway, I/O, turns, skin, devices and notes.
4. Source-linked summaries, activity log, recommendation/action reconciliation with clinician approval.
5. Handwriting/typing/voice input with draft review and immutable audit metadata.
6. Protocol retrieval with document title/version/section and no unsupported recommendations.

## Definition of done
- Pass `npm test`; add a test for every new data transformation.
- Confirm tablet and desktop rendering; keyboard and screen-reader affordances.
- No real patient data, API keys or hospital-only licensed materials.
- Clearly label simulated AI output and synthetic data; never claim clinical deployment.
- Changes should be proposed as pull requests for review, not automatically merged.
