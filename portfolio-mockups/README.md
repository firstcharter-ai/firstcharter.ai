# Interactive website examples

The public demos are responsive, browser-based guided examples. They use fictional sample data and prepared narrative responses. They are not live ChatGPT or Claude integrations, production client work, or evidence of achieved client outcomes. The arithmetic and choices are functional; no accounts are connected and no messages are sent.

- **Helm — Client work, simplified:** discovery notes and an illustrative rate card lead to a proposal, an approver check, an optional follow-up, onboarding tasks, and a draft workshop agenda. Prices belong to the fictional consultant, not First Charter AI.
- **Beacon — Your week, brought into focus:** source-backed weekly brief, calendar conflict, incomplete home-project quote, and reviewable email draft. Calendar changes and draft approval are simulated.
- **Manifest — Make sense of the numbers:** profit-to-cash explanation and a deterministic three-month cash scenario with adjustable equipment, staffing, and invoice collection timing. Assumptions and exclusions are inspectable.

Implementation: `public/demos/{helm,beacon,manifest}.html`, shared `demo.css` and `demo.mjs`. Existing clean URLs remain unchanged. `scripts/check-demo-models.mjs` verifies the fee and cash arithmetic.

These show possible starting points for a tailored engagement. The service positioning is continuing expert guidance and training, with tools and workflows adapted as client needs and AI capabilities evolve.
