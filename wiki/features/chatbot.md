---
title: Oslo Hack visitor chatbot
type: feature
status: accepted
updated: 2026-10-22
---

# Oslo Hack visitor chatbot

## Purpose and authority

The [user originally requested](../../raw/2026-10-22-feature-wiki-and-chatbot.md) free Nemotron through Vercel AI Gateway, then [approved OpenRouter](../../raw/2026-10-22-openrouter-migration.md) to avoid card verification while keeping Vercel hosting. Answer questions about the concept, sessions, preparation, beginner participation, and small project ideas. Explain when facts are not confirmed.

## Targets

- [api/chat.mjs](../../api/chat.mjs): server prompt, model, request limits, provider call, errors.
- [visitor-guide.md](../public/visitor-guide.md): public facts sent to the model; edits affect answers after rebuild/release.
- [Synthetic knowledge store](../public/synthetic/index.md): fictional FAQ/session/project/policy records compiled from an explicit allowlist. See [its feature](synthetic-knowledge-store.md).
- [index.html](../../index.html): chat form, example questions, privacy notice.
- [script.js](../../script.js): history, loading, retry, clear, text-only rendering.
- [style.css](../../style.css): panel and phone layout.

Target this specification for behavior changes, the public guide for verified new content, and the synthetic store for clearly fictional examples. Other wiki/raw files never become model context automatically.

## Integration

Exact OpenRouter model: `nvidia/nemotron-3.5-lightning:free`, confirmed in the live catalog on 2026-10-22 with zero input/output prices. Direct REST uses only the server-side `OPENROUTER_API_KEY`. Vercel keys, OIDC, and client authorization headers are never substituted or forwarded. Provider fallbacks are disabled, prompt/completion/request price ceilings are zero, and no alternate models/plugins or automatic retries are sent. No credits, card, libraries, visitor accounts, or database are added. The owner needs a free OpenRouter account/key. [Setup and evidence](../sources/openrouter.md).

OpenRouter's free account currently permits 50 requests/day and 20/minute shared across users; failed attempts count. Free model capacity is not guaranteed. Hosting/function limits are separate. The public privacy notice names OpenRouter and NVIDIA and warns against personal/sensitive information.

Limits: 16 KB request, nine alternating messages, 1,200-character new question, 500 output tokens, 25-second upstream timeout, three simultaneous requests per function instance. This guard is not a distributed rate limiter. Same-origin checks block ordinary cross-site browser calls, not arbitrary direct clients.

## Acceptance criteria

1. Visitor questions return actual Nemotron answers; unavailable upstream means an honest error.
2. No invented dates, venues, signup links, hosts, prices, capacity, or participants. No booking claims.
3. Only explicitly allowlisted baseline/synthetic public knowledge and bounded history are sent. Every answer using synthetic records must be labelled fictional; actual facts remain unconfirmed where the baseline guide says so. No private wiki/raw data or credentials.
4. Phone and keyboard support, announced replies/status, loading state, retryable question, clearable in-memory history.
5. Visible AI error/privacy notice: the free provider may retain messages for model improvement. No browser persistence.
6. Input, gateway-limit, network, configuration, and account errors are handled without leaking raw upstream details.

## Validation and release

The previous Vercel Gateway runtime is deployed at https://oslo-hack-mywork.vercel.app and remains blocked by upstream HTTP 403. Historical OIDC/key testing is recorded in [the log](../log.md).

The OpenRouter migration is in source on `feat/openrouter-free-chat`. Production release and real generation remain pending the new Production secret and staged test. Do not claim a working live chatbot based on mock tests. The status remains accepted until the real-generation criterion passes. See [open questions](../open-questions.md).
