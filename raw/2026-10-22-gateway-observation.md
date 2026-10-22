# Vercel AI Gateway model discovery

Observed 2026-10-22. Read the complete public model catalog at https://ai-gateway.vercel.sh/v1/models and filtered locally for Nemotron entries.

Selected exact ID: `nvidia/nemotron-3.5-lightning-free`.

Catalog fields: name Nemotron 3.5 Lightning Free; text input/output; context_window 1000000; max_tokens 65000; pricing input "0", output "0"; zdr "none"; no_training "none". The description says the provider may retain prompts and responses for model improvement.

Other Nemotron models in the same catalog have nonzero token prices. Do not silently substitute them.

Official API and authentication references checked: https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/rest-api and https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc . Pricing/account prerequisites: https://vercel.com/docs/ai-gateway/pricing . This is discovery evidence, not proof of account access or a successful generation.

