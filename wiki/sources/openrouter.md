---
title: OpenRouter free Nemotron setup and evidence
type: source
status: current
updated: 2026-10-22
---

# OpenRouter free Nemotron

The user approved this migration on 2026-10-22. See [authorization and live catalog observations](../../raw/2026-10-22-openrouter-migration.md). This supersedes the earlier Vercel Gateway integration, not Vercel hosting.

## No-card setup

1. Create a free OpenRouter account and open [API keys](https://openrouter.ai/settings/keys). Create a dedicated key named `Oslo Hack`. Do not buy credits, add a payment method, or enable auto top-up.
2. Open [Vercel project environment settings](https://vercel.com/dodo-f3ef/oslo-hack/settings/environment-variables). Add `OPENROUTER_API_KEY`, paste its value privately, select Production, and save as Secret (older UI: Sensitive). Never paste the key in chat, GitHub, or source code.
3. Redeploy the reviewed runtime after saving. Existing deployments do not gain a newly saved environment value automatically. Test the staged Production deployment before promotion.
4. For local preview, use a separate development key in ignored `dist/.env.local`; [.env.example](../../.env.example) contains only the empty variable name. Do not pull or reveal a Production Secret.

The old `AI_GATEWAY_API_KEY` is ignored by this integration. It can be revoked by its owner when no longer needed; migration does not delete account credentials automatically.

## Free-only behavior and limits

The [live model](https://openrouter.ai/nvidia/nemotron-3.5-lightning:free) is pinned as `nvidia/nemotron-3.5-lightning:free`. Direct REST uses a server-held OpenRouter key. No fallback models or plugins are sent; provider fallback is disabled and prompt/completion/request maximum prices are zero. See [routing controls](https://openrouter.ai/docs/guides/routing/provider-selection).

The [free plan](https://openrouter.ai/pricing) currently permits 50 requests/day and 20/minute shared across the account; failed attempts count. These are provider limits, not guarantees or per-visitor allowances. Free capacity can be unavailable. Do not buy credits to raise them without explicit authorization. Vercel hosting/function usage remains separately subject to its plan limits.

## Privacy and verification

Only the public allowlist and bounded conversation reach OpenRouter/NVIDIA. NVIDIA's free endpoint may retain messages for security and model improvement and does not provide EU in-region routing. The website warns against personal/sensitive data. Do not silently enable new privacy/training settings; if account privacy rules block the endpoint, explain the tradeoff to the owner.

Mock tests demonstrate request wiring and error handling, not model behavior. Live success must be checked with the deployed key, a real unconfirmed-meetup question, a labelled synthetic example, and the browser. See [chatbot](../features/chatbot.md), [development](../development.md), and [log](../log.md) for actual validation status.
