---
title: ADR 002: Root source and allowlisted deployment
type: decision
status: accepted
updated: 2026-10-22
---

# ADR 002: Root source and allowlisted deployment

Date: 2026-10-22.

[Initial inspection](../../raw/2026-10-22-code-observation.md) found identical website files in the root and `dist/`. Use root files as the editing source; rebuild deployment copies to avoid divergent manual edits. Preserve the existing Vercel link in `dist/.vercel/`.

The initial four-file build was expanded by the user's requested chatbot: allowlist `api/chat.mjs`, `package.json`, and `vercel.json` in addition to the website assets. Compile only sources explicitly listed in [the knowledge allowlist](../public/knowledge-sources.json) into the function. This now includes the baseline visitor guide and the user-requested [synthetic dataset](../public/synthetic/index.md), with separate labels and answer rules. Never recursively copy wiki/raw folders or environment files.

Tradeoff: `dist/` remains tracked for compatibility with the earlier hosting setup, so source edits require a rebuild. The check command detects mismatches. A deployment without the API function cannot provide the chatbot; the prior static Sites deployment is no longer sufficient for chat.

Related: [architecture](../architecture.md), [development](../development.md).

