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

Preview opens at `http://127.0.0.1:4182/`. The custom Node preview serves only known public assets and the same chat handler. Chat needs a local gateway key or fresh Vercel OIDC token. A missing credential gives an honest unavailable message; preview does not fake an AI response. Keep local credentials in the ignored `dist/.env.local`; never paste them into chat.

Edit root website files, the API handler, [public chatbot facts](public/visitor-guide.md), or [synthetic customer records](public/synthetic/index.md). Build compiles only the explicit [source allowlist](public/knowledge-sources.json) into the deployed API with data-type labels. Restart an already running preview after rebuilding; it imports the generated API at startup. Changing private feature specifications alone does not modify website behavior. See [architecture](architecture.md).

## Verification

Mechanical checks cover registered raw-source hashes, wiki metadata, links, index coverage, orphan pages, HTML anchors and assets, JavaScript syntax, and build parity. Tests cover API boundaries and mocked gateway responses. They cannot determine factual truth, detect every contradiction, or replace browser testing. Eight API tests passed on 2026-10-22; the real gateway call failed with account verification required. Do not describe mock responses as live AI verification.

After UI changes test phone/desktop layouts, keyboard focus, navigation, schedule open/close, chat loading/retry/error behavior, and a real gateway response if credentials and account access allow. Record exact results in [the log](log.md), including blocked steps.

## Release

Production project: `oslo-hack`; team: `dodo-f3ef`; stable URL: https://oslo-hack-livid.vercel.app.

Use the existing `dist/.vercel/project.json` link; confirm owner/project before deployment. Build and check first. Deploy only `dist/` so original sources, internal notes, and credentials are not published. Vercel OIDC is preferred for the deployed function; local tokens expire and need refreshing. Preserve existing hosting configuration.

The chatbot uses only `nvidia/nemotron-3.5-lightning-free`, discovered on 2026-10-22. No automatic paid fallback or credit purchase. Model availability and account prerequisites may change; check [gateway references](sources/ai-gateway.md). Gateway setup or billing verification may require action by the account owner.

