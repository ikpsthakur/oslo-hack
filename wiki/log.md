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

## [2026-10-22] publish | Public GitHub repository verified

Created [iaznexai/oslo-hack](https://github.com/iaznexai/oslo-hack) as a PUBLIC repository, with `main` as the default branch. Pushed bootstrap commit `4b4eae436c8842e36e14c901046938e0b20f7467` and preserved the six earlier website commits. The local `github` remote points to the new repository; original `origin` was preserved. Verified that only the intended 73 tracked project files were selected, and common credential-pattern scans passed for those files and earlier history. Credentials, local Vercel state, local screenshots, and the separate bike project were excluded.

The first hosted [CI run](https://github.com/iaznexai/oslo-hack/actions/runs/39802810556) completed successfully, validating the build/wiki and all 14 tests without live model credentials. Added repository onboarding links and clarified that wiki/raw documentation is now publicly readable in GitHub, while only allowlisted public knowledge reaches the chatbot. The repository uses a pull-request convention; no branch protection or automatic production deployment was enabled. Vercel and gateway billing configuration remain unchanged.

## [2026-10-22] change | First feature branch: unconfirmed meetup

The user requested the first branch-and-pull-request change: replace placeholder session details with a clear unconfirmed state and explain each GitHub step. Verified a clean `main`, fetched GitHub, confirmed it was up to date, and created `fix/unconfirmed-meetup`.

Updated source HTML to remove the sample date, venue, and open-session claim. Added an example-only agenda notice and aligned the chat note and public visitor guide. Updated [the session specification](features/session-details.md), roadmap, and content-gap notes. Build, browser validation, and pull-request outcomes will be recorded after execution. This branch work does not deploy or modify production.

## [2026-10-22] verify | Unconfirmed meetup change and account correction

Local build, wiki/deployment checks, all 14 API/knowledge tests, and the credential-pattern scan passed. Browser checks verified the new unconfirmed copy, removal of the old date and venue, agenda expansion/collapse and example notice, and no horizontal overflow at effective widths of 375 and 1440 CSS pixels. A review screenshot was saved locally under outputs. No live model call or production deployment was part of this copy change.

Before pushing this branch, the user clarified that the destination must be `ikpsthakur/oslo-hack`, not the previously created `iaznexai` repository. The user completed account authorization, and GitHub's user endpoint confirmed `ikpsthakur`. Preserve the prior repository without modification, correct repository links on the new baseline, and continue this feature through a pull request in the requested account. Hosted CI and pull-request results remain to be verified.

## [2026-10-22] publish | Requested ikpsthakur repository and first feature branch

Created and verified [ikpsthakur/oslo-hack](https://github.com/ikpsthakur/oslo-hack) as PUBLIC under the authenticated `ikpsthakur` account. Baseline commit `73ac70a` corrects repository links and preserves the existing project history. Pushed this baseline to `main`. Renamed the old GitHub remote to `github-iaznexai`, added the requested destination as `github`, and left the original hosting `origin` and earlier repository unchanged.

Saved the tested meetup update as a local feature commit and rebased it onto the corrected baseline. The proposed change remains isolated on `fix/unconfirmed-meetup`; it has not been merged or deployed. The pull request will compare that branch against `main`, with GitHub CI checking the proposed merged result. This is the first review exercise described in [the DevOps guide](github-devops.md).

