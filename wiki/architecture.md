---
title: Architecture and code map
type: technical
status: current
updated: 2026-10-22
---

# Architecture and code map

## Executable source

- [index.html](../index.html): page sections, semantic content, chatbot form.
- [style.css](../style.css): dark/lime tokens, responsive layout, interaction styling.
- [script.js](../script.js): schedule toggle, year, chat UI and fetch.
- [photo.jpg](../photo.jpg): existing hero image.
- [api/chat.mjs](../api/chat.mjs): Vercel Node function; server-held credentials, request validation, Nemotron call.
- [visitor-guide.md](public/visitor-guide.md): curated public chatbot facts, compiled into the API file during build.
- [Synthetic store](public/synthetic/index.md): fictional FAQs, sessions, projects, and participation examples.
- [knowledge-sources.json](public/knowledge-sources.json): explicit knowledge source allowlist.
- [knowledge.mjs](../scripts/knowledge.mjs): source validation, labels, unique IDs, and bounded context compilation.
- [project.mjs](../scripts/project.mjs): allowlisted build, integrity and link checks.
- [dev-server.mjs](../scripts/dev-server.mjs): local preview with the real API handler.

## Data flow

Visitor chat → same-origin `/api/chat` → Vercel AI Gateway → exact free Nemotron model → plain-text answer. Only a short bounded conversation and the allowlisted public knowledge bundle reach the model. The bundle contains the baseline visitor guide and explicitly labelled synthetic records; the guide takes precedence for real-world questions. The model has no tools, filesystem, signup action, or wiki-editing access. The browser never receives the OIDC token or gateway key.

`raw/` and wiki files absent from the knowledge allowlist are development knowledge, never model context or deployment assets. Synthetic record context is embedded as text in the API; the Markdown directories themselves are not copied or served. `dist/` is populated from an explicit list of runtime files. Its existing `.vercel/` linkage is preserved. See [source/build decision](decisions/002-source-and-build.md).

## Storage and limits

No database, accounts, or browser persistence is added. The UI holds conversation in memory; page reload clears it. Providers may retain chat text; see [chatbot](features/chatbot.md). Request/history/output bounds and a per-instance concurrency guard limit accidental overload; this is not a distributed rate limiter.

## Related

[Development](development.md), [feature index](index.md), [evidence](sources/project-baseline.md).

