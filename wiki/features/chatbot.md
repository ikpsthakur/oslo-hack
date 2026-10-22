---
title: Oslo Hack visitor chatbot
type: feature
status: accepted
updated: 2026-10-22
---

# Oslo Hack visitor chatbot

## Purpose and authority

The [user requested](../../raw/2026-10-22-feature-wiki-and-chatbot.md) a chatbot using free Nemotron through Vercel AI Gateway. Answer questions about the concept, sessions, preparation, beginner participation, and small project ideas. Explain when facts are not confirmed.

## Targets

- [api/chat.mjs](../../api/chat.mjs): server prompt, model, request limits, provider call, errors.
- [visitor-guide.md](../public/visitor-guide.md): public facts sent to the model; edits affect answers after rebuild/release.
- [Synthetic knowledge store](../public/synthetic/index.md): fictional FAQ/session/project/policy records compiled from an explicit allowlist. See [its feature](synthetic-knowledge-store.md).
- [index.html](../../index.html): chat form, example questions, privacy notice.
- [script.js](../../script.js): history, loading, retry, clear, text-only rendering.
- [style.css](../../style.css): panel and phone layout.

Target this specification for behavior changes, the public guide for verified new content, and the synthetic store for clearly fictional examples. Other wiki/raw files never become model context automatically.

## Integration

Exact model: `nvidia/nemotron-3.5-lightning-free`, discovered 2026-10-22 with zero input/output token prices. No paid fallback, credit purchase, client credentials, libraries, database, or accounts. Direct REST uses a configured server-side `AI_GATEWAY_API_KEY` first, then the per-request Vercel OIDC header on Vercel, then the local/build environment token. Production OIDC tokens are read on each request rather than cached at module load. [Gateway evidence](../sources/ai-gateway.md).

Limits: 16 KB request, nine alternating messages, 1,200-character new question, 500 output tokens, 25-second upstream timeout, three simultaneous requests per function instance. This guard is not a distributed rate limiter. Same-origin checks block ordinary cross-site browser calls, not arbitrary direct clients.

## Acceptance criteria

1. Visitor questions return actual Nemotron answers; unavailable upstream means an honest error.
2. No invented dates, venues, signup links, hosts, prices, capacity, or participants. No booking claims.
3. Only explicitly allowlisted baseline/synthetic public knowledge and bounded history are sent. Every answer using synthetic records must be labelled fictional; actual facts remain unconfirmed where the baseline guide says so. No private wiki/raw data or credentials.
4. Phone and keyboard support, announced replies/status, loading state, retryable question, clearable in-memory history.
5. Visible AI error/privacy notice: the free provider may retain messages for model improvement. No browser persistence.
6. Input, gateway-limit, network, configuration, and account errors are handled without leaking raw upstream details.

## Validation and release

Code is deployed in production on 2026-10-22 at https://oslo-hack-mywork.vercel.app. PR #2 corrected production OIDC access and added regression coverage; all 17 API/knowledge tests passed locally and in GitHub CI. A hidden Production API key is present. Browser checks confirmed the public page, agenda toggle, client request, and retryable unavailable state.

Live generation remains unverified: the deployed function reaches the Gateway, which returns HTTP 403; the earlier direct team-token request specifically returned `customer_verification_required`. Account access/verification still needs owner resolution. No successful answer is claimed. The status remains accepted until the real-generation criterion passes. See [the log](../log.md) and [open questions](../open-questions.md).
