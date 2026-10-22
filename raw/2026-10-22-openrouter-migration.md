# OpenRouter migration authorization and discovery

Recorded 2026-10-22. This is a summary of the user's request and tool observations, not a verbatim transcript. No credentials are recorded.

The user explicitly approved switching the visitor chatbot to OpenRouter's free Nemotron model while retaining Vercel hosting, asked for no-card key setup instructions, and requested a live chatbot test after configuration. No paid fallback, credit purchase, or card entry is authorized.

The OpenRouter public catalog at https://openrouter.ai/api/v1/models returned `nvidia/nemotron-3.5-lightning:free` with prompt and completion prices both `0`. It lists reasoning, max_tokens, and temperature among supported parameters.

Official references checked on this date:

- https://openrouter.ai/pricing lists a free API plan with no payment options, 50 requests per day and 20 per minute; failed attempts count toward the daily allowance. Quotas are shared by the account, not individual website visitors.
- https://openrouter.ai/docs/quickstart documents bearer-key authentication and https://openrouter.ai/api/v1/chat/completions.
- https://openrouter.ai/docs/guides/routing/provider-selection documents `provider.allow_fallbacks: false` and a `max_price` ceiling. A zero ceiling prevents routing when free pricing is unavailable.
- https://openrouter.ai/nvidia/nemotron-3.5-lightning:free states that NVIDIA may log inputs/outputs for security and product improvement and warns against confidential or personal information. The free endpoint is not offered through EU in-region routing.

The owner must create their own free OpenRouter account/key and enter the key directly into Vercel's Production environment settings as `OPENROUTER_API_KEY`. Existing Vercel AI Gateway keys cannot authenticate with OpenRouter. No successful live OpenRouter generation is established by this discovery record.
