---
title: Development and release
type: workflow
status: current
updated: 2026-10-22
---

# Development and release

## Local work

Run from the repository root:

```sh
npm run build
npm run check
npm test
npm run preview
```

Preview opens at `http://127.0.0.1:4182/`. The custom Node preview serves only known public assets and the same chat handler. Chat needs `OPENROUTER_API_KEY`; Vercel keys/OIDC are not accepted. A missing credential gives an honest unavailable message; preview does not fake an AI response. Keep a separate development credential in ignored `dist/.env.local`; never paste it into chat. See [setup](sources/openrouter.md) and [.env.example](../.env.example).

Edit root website files, the API handler, [public chatbot facts](public/visitor-guide.md), or [synthetic customer records](public/synthetic/index.md). Build compiles only the explicit [source allowlist](public/knowledge-sources.json) into the deployed API with data-type labels. Restart an already running preview after rebuilding; it imports the generated API at startup. Changing private feature specifications alone does not modify website behavior. See [architecture](architecture.md).

## Verification

Mechanical checks cover registered raw-source hashes, wiki metadata, links, index coverage, orphan pages, HTML anchors and assets, JavaScript syntax, and build parity. Tests cover API boundaries and mocked provider responses. They cannot determine factual truth, detect every contradiction, or replace browser testing. Do not describe mock responses as live AI verification. The prior Vercel Gateway failure is historical; the OpenRouter migration requires new live tests.

After UI changes test phone/desktop layouts, keyboard focus, navigation, schedule open/close, chat loading/retry/error behavior, and a real provider response if credentials and account access allow. Record exact results in [the log](log.md), including blocked steps.

## Release

Production project: `oslo-hack`; team: `dodo-f3ef`; stable URL: https://oslo-hack-mywork.vercel.app.

Use the existing `dist/.vercel/project.json` link; confirm owner/project before deployment. Build and check first. Deploy only `dist/` so original sources, internal notes, and credentials are not published. Preserve existing hosting configuration. Stage with Production variables and `--prod --skip-domain`, test, then promote that exact build.

The chatbot uses only OpenRouter's `nvidia/nemotron-3.5-lightning:free`, confirmed on 2026-10-22. No automatic paid fallback or credit purchase. Zero prompt/completion/request price ceilings reject non-free routing. Model availability and quotas may change; check [OpenRouter references](sources/openrouter.md).

Save `OPENROUTER_API_KEY` directly in Vercel's environment settings as a Production Secret, then deploy. Never post keys in chat, commits, PRs, or command-line arguments. Existing `AI_GATEWAY_API_KEY`, `VERCEL_OIDC_TOKEN`, and inbound auth headers are ignored. If account privacy settings block NVIDIA's free endpoint, explain the provider's retention terms rather than changing privacy settings silently.

