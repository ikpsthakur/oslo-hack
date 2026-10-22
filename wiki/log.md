---
title: Project wiki log
type: log
status: current
updated: 2026-10-22
---

# Project wiki log

Append entries at the bottom. Dates describe work, not independent evidence of current production availability.

## [2026-10-22] ingest | Initialise project memory

Captured selected user requests, baseline code observations, and the primary LLM Wiki reference. Created [project requirements](project.md), [architecture](architecture.md), dedicated [feature pages](index.md), decisions, templates, and the proposed [roadmap](roadmap.md). Root website files became canonical; existing hosting links were preserved. Flagged unconfirmed session copy in [open questions](open-questions.md).

## [2026-10-22] scope | Feature targets and Nemotron chatbot

The user requested individual Markdown targets and then instructed use of Nemotron through Vercel AI Gateway. Captured [follow-up evidence](../raw/2026-10-22-feature-wiki-and-chatbot.md). Added a [chatbot feature specification](features/chatbot.md), curated [public visitor knowledge](public/visitor-guide.md), and [gateway references](sources/ai-gateway.md). Verification and release results will be appended after execution.

## [2026-10-22] verify | Local wiki and chatbot checks

Built seven allowlisted runtime files. `npm run check` passed for 25 wiki pages, five raw-source hashes, wiki links/index coverage, HTML anchors/assets, JavaScript syntax, and deployment parity. All eight API tests passed, including payload limits, cross-origin checks, role validation, credential absence, sanitized provider errors, and concurrency release.

Browser verification on the local Node preview confirmed schedule expansion/collapse, chat loading and error messages, preserved retry text, and clear. Measured effective CSS viewport widths of 375 and 1440 pixels; document widths matched, with the photo loaded and chat panel fitting its layout. Phone screenshot retained locally under outputs. No full accessibility audit or live successful generation is claimed.

## [2026-10-22] blocked | Gateway account verification

The existing `dodo-f3ef/oslo-hack` Vercel link was verified and the ignored local development OIDC token refreshed. A real free-Nemotron generation returned HTTP 403 with `customer_verification_required`. A focused diagnostic confirmed Vercel requires a valid credit card on file. The API correctly returns a sanitized unavailable response, and the browser preserves the question for retry. No credit purchase, card entry, paid model, billing change, or production deployment was performed. The user's account action and a repeat live test remain outstanding.

## [2026-10-22] implement | Synthetic customer knowledge store

Captured and registered [the user's request](../raw/2026-10-22-synthetic-store-request.md). Added [17 fictional records](public/synthetic/index.md): eight FAQs, two workshop examples, three project ideas, and four hypothetical participation scenarios. Added a dedicated [feature specification](features/synthetic-knowledge-store.md) and [manual model-evaluation prompts](public/synthetic/evaluation.md).

Extended the public-knowledge boundary in AGENTS.md and the build: only the explicit [source allowlist](public/knowledge-sources.json) reaches the chatbot. [Knowledge compilation](../scripts/knowledge.mjs) checks public paths, data-type metadata, visible fiction warnings, duplicate sources/record IDs, empty documents, and context size. The server prompt requires a fictional-demo label and gives the baseline visitor guide priority for actual facts. Fictional examples cannot establish real reservations, policies, or live availability. No database or real customer profiles were added.

`npm run build` and `npm run check` passed for 32 wiki pages, six preserved raw sources, source isolation, assets, syntax, and deployment parity. All 14 tests passed, including six new knowledge-store tests and mocked request wiring. These checks do not prove real model adherence; account verification still blocks live generation. No new live gateway request, UI change, or Vercel deployment was performed for this store.

## [2026-10-22] prepare | Public GitHub repository and CI

The user requested public GitHub hosting for this codebase and a DevOps learning workflow. Confirmed the existing GitHub CLI account is `iaznexai` and that `iaznexai/oslo-hack` did not already exist. Prepared [CI](../.github/workflows/ci.yml), a pull-request template, [contributor instructions](../CONTRIBUTING.md), and the [learning guide](github-devops.md). Kept the separate local bike project, credentials, environment files, and local Vercel state excluded. Preserved the original six-commit website history and original remote.

The existing history passed a scan for common credential patterns. Local build/wiki checks and all 14 API/knowledge tests passed. GitHub CI is designed to use no live model credentials and performs no production deployment. Repository creation, push, and hosted CI results will be recorded after they are verified.

