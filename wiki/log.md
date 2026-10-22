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

## [2026-10-22] release | Review and merge PR 1

At the user's request, reviewed the complete [PR 1](https://github.com/ikpsthakur/oslo-hack/pull/1) diff and passing Validate check. Found no blocking issue in the copy/knowledge update. Merged the exact reviewed head using a merge commit, resulting in `711070416ec5089cc6c8ab7b3c84dbaae408c602`. Synced local main and reran build, checks, all 14 existing tests, and the credential scan. Main's hosted CI also passed.

Confirmed the intended Vercel team/project and deployed only the seven allowlisted runtime files. Deployment `dpl_BzzXaV6yup6SBPxQSnEzqTATiRhS` became READY and was promoted. The originally requested short hostname was already in use; the user selected the replacement https://oslo-hack-mywork.vercel.app, which was accepted and returned public HTTP 200. The legacy address is being removed only after replacement verification.

## [2026-10-22] fix | Production chatbot credentials and domain retirement

Live testing found two distinct blockers: the direct gateway call returned 403 `customer_verification_required`, and the deployed function returned a missing-credential error. Official Vercel OIDC documentation confirms production tokens arrive in a request header rather than the build/local environment variable. Added request-header support in the Vercel runtime, retained explicit gateway-key precedence and the local fallback, and added three regression tests on `fix/production-chat-and-domain`.

The user pasted a gateway credential. It was not repeated, written to files, executed as a command argument, or committed. Advised rotation and direct entry of a replacement as a Production environment secret in Vercel. Expanded the credential-pattern scanner to detect gateway keys. No billing details were entered or credit purchases made.

Updated active release documentation to use the selected address. As an explicit exception to source immutability, redacted the retired address from the dated raw observation at the user's request and updated only that source's manifest hash. Earlier Git history remains intact; project source, current hosting linkage, and rollback deployments are preserved because the old alias is not a separate codebase.

## [2026-10-22] verify | Production release and external chatbot blocker

[PR #2](https://github.com/ikpsthakur/oslo-hack/pull/2) passed CI with all 17 tests and was reviewed and merged as `7e8d57c30fb87a3c8a88ad12df0bca8248f357f7`. Built and deployed that exact runtime to `dpl_4yhstVYNtHTBrkAn9Fk5PYFS3rbo`, then promoted it to production. Vercel reported READY, Node.js Functions plus static files, and a six-second build. Main's hosted CI passed.

The selected public address https://oslo-hack-mywork.vercel.app returned HTTP 200 and showed the unconfirmed meetup. Removed the retired domain from this exact project after verifying the replacement; its URL returned HTTP 404. Verified that only the new primary project domain remains and that no retired-hostname literal remains in current tracked project content. These changes did not delete source files or rewrite earlier Git history.

The user configured a hidden Production `AI_GATEWAY_API_KEY`. A new deployment included it. The public browser's chat request reached the deployed API, which reached Gateway and returned a sanitized HTTP 503 after Gateway rejected it with HTTP 403. The one-hour runtime error scan showed two Gateway-403 entries (staged and public tests). The public UI preserved the question for retry; no fake answer was substituted. Attempting a private CLI environment diagnostic could not export the sensitive key, so its value was never retrieved or printed.

Earlier, the direct team-OIDC test explicitly returned `customer_verification_required`; the later secret-key test's subtype is not known. Asked the owner whether account verification was completed for the relevant team. A successful live response remains outstanding and must be verified after that external state changes. No drains or external monitoring configuration was inspected or modified. All exposed-key rotation advice and Production-secret instructions remain applicable.

## [2026-10-22] migrate | Approved no-card OpenRouter integration

The user explicitly approved switching to OpenRouter free Nemotron while retaining Vercel hosting. Registered [the new authorization/discovery source](../raw/2026-10-22-openrouter-migration.md) without changing previous raw evidence. Updated [setup](sources/openrouter.md), feature/architecture/development documentation, and AGENTS.md's credential/model convention to match the new authorization. The old Gateway key/OIDC paths are no longer used.

Merged the reviewed, green release-documentation PR #3 and created `feat/openrouter-free-chat`. Changed direct REST to OpenRouter, pinned the live-catalog free model, disabled fallbacks, set zero prompt/completion/request price ceilings, updated the public privacy notice, and added regression coverage proving Vercel/client credentials cannot be forwarded. The free account allowance is shared across visitors, not per person. Production release and real generation remain pending the owner's new Production secret and staged verification; no successful live OpenRouter answer is claimed yet.

Local build and structural checks passed for 34 wiki pages and seven registered sources. All 17 API/knowledge tests passed, including request wiring, zero-price/fallback guards, credential isolation, knowledge boundaries, and sanitized errors. The credential-pattern scan passed. A local browser check showed the updated OpenRouter/NVIDIA notice, unchanged chat form, and unconfirmed meetup. No real generation was attempted without the new key; the last read-only Production environment check showed only the old Gateway secret.

## [2026-10-22] release | OpenRouter live generation verified

The owner confirmed adding `OPENROUTER_API_KEY` to Vercel Production. Read-only environment listing confirmed a Hidden Secret on the existing `dodo-f3ef/oslo-hack` project without reading its value. Reviewed green [PR #4](https://github.com/ikpsthakur/oslo-hack/pull/4), merged as `c01bd6b3ba10858a685008c7af29b3b78865c605`, rebuilt the exact main commit, and passed build/wiki checks, all 17 tests, and the credential-pattern scan.

Deployed only `dist/` with Production variables and domain assignment skipped. Vercel reported READY for `dpl_ENbjeDMnQEAqZvDHiVXm6boGzdhg` at https://oslo-hack-pru7k82yb-dodo-f3ef.vercel.app, a five-second build, static files and the Node.js 24 `api/chat` function in iad1. Two authenticated real API requests returned HTTP 200: the next-real-meetup answer preserved unconfirmed date/venue/booking facts; the project answer explicitly labelled the sample fictional. Neither was a mocked response.

Promoted that same staged Production build and verified https://oslo-hack-mywork.vercel.app points to it. The public browser loaded without login. Submitted "What is Oslo Hack? Please answer in one short sentence." and observed a real answer describing the concept, restored controls, and no console warnings/errors. At 375 CSS pixels the document scroll width remained 375; the reply, input/send/clear controls, and privacy notice were readable. Saved a disposable phone screenshot under `outputs/openrouter-live-phone.png` and reset the viewport override.

The new deployment's one-hour error scan returned no error logs at check time; this is point-in-time evidence, not monitoring coverage. Drains/external monitoring were not inspected or changed. Three live model requests were used for this release verification. No card entry, credit purchase, paid fallback, secret retrieval, or privacy-setting change was performed. The old Vercel Gateway credential remains unused; no account key was revoked automatically.

## [2026-10-22] enhance | Floating corner chat panel

The user requested a bottom-right chat icon that opens a popup instead of the inline chat section. Created `feat/floating-chat`, preserving the pending release-documentation changes. Reused the existing form/provider integration inside a native non-modal dialog with an accessible launcher, close button, Escape handling, focus return, retained in-memory conversation, and existing `#ask` deep-link support. Async replies do not focus a closed panel. Preserved black/lime styling and added dynamic-viewport/safe-area bounds, scrollable content, and footer clearance. Added UI-controller regression tests; browser verification and release are pending.

Local build/wiki checks and all 21 tests passed, including four new controller tests for toggling/history, Escape/focus, deep links, and closing during an in-flight reply. Local browser checks verified the default collapsed launcher, open/focus, Escape/return focus, and desktop lower-right placement. At 375×812 CSS pixels the panel stayed within the viewport (10px side insets, bottom 726px) with document width 375px and no horizontal overflow. Native on-screen keyboard behavior was not simulated.

