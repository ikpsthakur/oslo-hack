---
title: Synthetic chatbot knowledge store
type: feature
status: implemented
updated: 2026-10-22
---

# Synthetic chatbot knowledge store

## Request and outcome

The [user requested](../../raw/2026-10-22-synthetic-store-request.md) a synthetic data store in the wiki to support customer answers, then [requested broader guides, support, projects, creative bits, and combinations](../../raw/2026-10-22-knowledge-expansion.md) on 2026-10-22. The [store index](../public/synthetic/index.md) now links 56 fictional records: eight FAQs, two sessions, twelve projects, four participation scenarios, eight guides, eight support scenarios, eight combinations, and six experiment/insight cards. These are editable Markdown, not a database of real customers.

## Code and knowledge targets

- [knowledge-sources.json](../public/knowledge-sources.json): explicit source allowlist and data types.
- [knowledge.mjs](../../scripts/knowledge.mjs): validates and compiles the public knowledge bundle.
- [project.mjs](../../scripts/project.mjs): embeds that bundle in the deployable API.
- [api/chat.mjs](../../api/chat.mjs): answer instructions distinguishing synthetic from real information.
- [Evaluation prompts](../public/synthetic/evaluation.md): manual factual-boundary checks, excluded from context.

## Acceptance criteria

Every synthetic source must carry `dataset: synthetic` metadata and a visible warning. Only allowlisted files may become chat context. Internal wiki pages, raw sources, and evaluation prompts stay excluded. Build must fail on missing files, mislabelled sources, duplicate record IDs, dangling record references, invalid source paths, or a knowledge bundle above 32,000 characters. Categories: FAQ, SESSION, PROJECT, POLICY, GUIDE, SUPPORT, COMBO, INSIGHT, each followed by a unique three-digit ID.

Model instructions require an explicit fictional-demo label when using synthetic records and an unconfirmed answer for actual event, booking, availability, cost, contact, or policy questions. Fictional capacities are not live seat counts. No real personal data or usable booking/contact details are invented. Markdown edits take effect after rebuild; production still needs a release.

## Validation and release

The whole curated bundle is compiled into `dist/api/chat.mjs` during build, then deployed to Vercel. Each question sends the published bundle and bounded conversation to the model; there is no live GitHub fetch, model training, vector database, or per-query retrieval at this size. A Markdown edit needs rebuild/release; a new file also needs explicit allowlisting. See [architecture](../architecture.md).

All 26 tests and PR #7's hosted CI passed. On 2026-10-22 the expanded catalogue returned real labelled combination and guide answers, an accurate published-snapshot explanation, and unconfirmed actual-event boundaries. The public popup's refreshed prompt submitted its new question and received a real guide response. These four checks do not establish that every record or manual evaluation case passes. See [the log](../log.md) for deployment evidence and observed formatting limitations.
