---
title: AI Gateway integration evidence
type: source
status: current
updated: 2026-10-22
---

# AI Gateway integration evidence

Checked on 2026-10-22. [Raw discovery record](../../raw/2026-10-22-gateway-observation.md).

The live model catalog at https://ai-gateway.vercel.sh/v1/models includes `nvidia/nemotron-3.5-lightning-free`, a text/chat model with input and output prices of zero. Its description states that the provider may retain prompts and responses for model improvement. This does not imply unlimited availability or zero Vercel function/hosting usage.

Integration uses direct HTTP through the [Chat Completions REST API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api), preserving the no-library frontend. [OIDC authentication](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc) keeps deployed credentials server-side. A local gateway key is an alternative, not a browser setting.

[Pricing and account eligibility](https://vercel.com/docs/ai-gateway/pricing) must be checked on the account; free-model pricing does not prove the account is enabled. No credit purchases, top-ups, or paid-model fallback are part of this implementation.

Related: [chatbot specification](../features/chatbot.md), [development](../development.md).

Production verification exposed a runtime distinction: the [OIDC federation documentation](https://vercel.com/docs/oidc) says functions receive `x-vercel-oidc-token` on each Request, while `VERCEL_OIDC_TOKEN` is provided for builds/local development. Updated the handler and regression tests accordingly. The actual production API previously returned a missing-credential response; the separate authenticated local gateway call returned 403 account verification required. Neither is a successful model-generation result.

