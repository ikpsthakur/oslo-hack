---
title: Synthetic chatbot knowledge store
type: feature
status: implemented
updated: 2026-10-22
---

# Synthetic chatbot knowledge store

## Request and outcome

The [user requested](../../raw/2026-10-22-synthetic-store-request.md) a synthetic data store in the wiki to support customer answers. The [store index](../public/synthetic/index.md) links 17 fictional records: eight FAQs, two sessions, three projects, and four participation scenarios. These are editable Markdown, not a database of real customers.

## Code and knowledge targets

- [knowledge-sources.json](../public/knowledge-sources.json): explicit source allowlist and data types.
- [knowledge.mjs](../../scripts/knowledge.mjs): validates and compiles the public knowledge bundle.
- [project.mjs](../../scripts/project.mjs): embeds that bundle in the deployable API.
- [api/chat.mjs](../../api/chat.mjs): answer instructions distinguishing synthetic from real information.
- [Evaluation prompts](../public/synthetic/evaluation.md): manual factual-boundary checks, excluded from context.

## Acceptance criteria

Every synthetic source must carry `dataset: synthetic` metadata and a visible warning. Only allowlisted files may become chat context. Internal wiki pages, raw sources, and evaluation prompts stay excluded. Build must fail on missing files, mislabelled sources, duplicate record IDs, invalid source paths, or an oversized knowledge bundle.

Model instructions require an explicit fictional-demo label when using synthetic records and an unconfirmed answer for actual event, booking, availability, cost, contact, or policy questions. Fictional capacities are not live seat counts. No real personal data or usable booking/contact details are invented. Markdown edits take effect after rebuild; production still needs a release.

## Validation and release

Local implementation includes automated compilation and request-wiring tests. Final execution results are recorded in [the log](../log.md). Live model behavior remains unverified because the existing [chatbot](chatbot.md) is blocked by Vercel account verification. This change does not deploy to Vercel.
