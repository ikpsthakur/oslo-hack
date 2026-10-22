# Oslo Hack

[![CI](https://github.com/ikpsthakur/oslo-hack/actions/workflows/ci.yml/badge.svg)](https://github.com/ikpsthakur/oslo-hack/actions/workflows/ci.yml)

Public repository: [ikpsthakur/oslo-hack](https://github.com/ikpsthakur/oslo-hack).

A phone-friendly, one-page website for finding people in Oslo to build small projects with. This repository also holds a local, AI-maintained project wiki, so requirements and decisions can outlast a chat session.

## Start here

Clone the repository and open its folder in Codex or your editor:

```sh
git clone https://github.com/ikpsthakur/oslo-hack.git
cd oslo-hack
```

Read the [wiki index](wiki/index.md) for project context and the [roadmap](wiki/roadmap.md) for suggested next steps. [AGENTS.md](AGENTS.md) defines how an AI should maintain the project memory. The wiki can also be read in any text editor or by opening this folder as an Obsidian vault; no Obsidian plugins are required.

This adapts [Andrej Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) to maintaining a small website. The AI reads source material, updates linked knowledge pages, and records useful decisions and work. The files themselves are the persistent memory; updates happen when you ask an AI agent to work in this folder. The development wiki needs no background model or API key.

The separately requested visitor chatbot uses OpenRouter's `nvidia/nemotron-3.5-lightning:free`, with the website and API hosted on Vercel. Its knowledge comes from [the public visitor guide](wiki/public/visitor-guide.md) and a [synthetic knowledge store](wiki/public/synthetic/index.md), explicitly selected by [the source allowlist](wiki/public/knowledge-sources.json) and compiled during build. Internal feature specifications and raw notes are not sent to the model. See [the chatbot feature](wiki/features/chatbot.md) for behavior and limits.

The synthetic store has 17 fictional records covering FAQs, sample sessions, project ideas, and participation scenarios. Edit those Markdown files to enhance demo answers, then rebuild and restart the local preview. The assistant is instructed to label fictional answers; sample dates, venues, capacity, costs, and policies never establish real arrangements. Actual verified facts belong in the baseline visitor guide. See [the store feature](wiki/features/synthetic-knowledge-store.md) and [evaluation prompts](wiki/public/synthetic/evaluation.md).

The user approved the OpenRouter migration on 2026-10-22 after Vercel Gateway returned HTTP 403. PR #4 is merged and deployed; real replies were verified on the staged Production API and public browser on 2026-10-22. The code uses a server-side `OPENROUTER_API_KEY`; the old Vercel key is not reused. [No-card setup instructions](wiki/sources/openrouter.md) explain secure configuration. The free allowance is currently 50 requests/day shared across the account. Only the pinned free model is called, with fallbacks disabled and zero price ceilings. No credits were purchased, no card was added, and no billing or privacy settings were changed by the agent. See [release evidence](wiki/log.md).

## Layout

```text
AGENTS.md             AI instructions and wiki conventions
raw/                  Original requests, evidence, and future research
wiki/                 Compiled project knowledge and feature specifications
templates/            Starting points for new sources and features
outputs/              Local reports and temporary research results
index.html            Editable website markup and content
style.css             Editable website styling
script.js             Editable website behavior
photo.jpg             Existing website photo
scripts/project.mjs   Dependency-free build and structural checks
scripts/dev-server.mjs Local preview including the API
api/chat.mjs          Server-side Nemotron integration
tests/                API contract and failure-path tests
vercel.json           Runtime deployment configuration
dist/                 Website-only deployment output; existing Vercel link stays here
oslo-bike-finder/     Separate existing project, outside this wiki's scope
```

## Run and check

Requires Node.js 22+ for tooling, tests, and the local preview (Vercel uses Node.js 24). There are no npm dependencies to install.

```sh
# Run from the repository folder.
npm run build
npm run check
npm test
npm run preview
```

Open `http://127.0.0.1:4182/`. Stop the preview with Control-C. Preview serves an allowlist of website assets from `dist` and the chat API, keeping local knowledge folders out of the website. For local chat, copy [.env.example](.env.example) to ignored `dist/.env.local` and enter a separate development OpenRouter key there; never paste secrets into chat or code. Production uses the Vercel project's `OPENROUTER_API_KEY` Secret. Vercel OIDC is not an OpenRouter credential.

Edit root website files or the API, then rebuild. The build copies runtime files through an explicit allowlist and preserves the existing `dist/.vercel` configuration. `npm run check` checks source integrity, wiki links and coverage, website anchors/assets, JavaScript syntax, and deployment parity. It is a structural check, not a substitute for browser testing.

## GitHub and DevOps

The public GitHub setup includes source code, the wiki, synthetic customer knowledge, build tooling, and tests. [The learning guide](wiki/github-devops.md) explains branches, commits, pull requests, CI, and separate Vercel releases. See [CONTRIBUTING.md](CONTRIBUTING.md) for the short contributor checklist and [the CI workflow](.github/workflows/ci.yml) for automated checks. Publication and CI verification outcomes are recorded in [the log](wiki/log.md).

## Work with the wiki

Try these prompts in this folder:

- “Read AGENTS.md and wiki/index.md, then suggest the smallest useful next feature.”
- “Ingest raw/my-meetup-notes.md into the wiki. Flag any contradictions and list the questions we still need to answer.”
- “Draft a feature specification for a project-ideas section. Keep suggestions separate from my confirmed requirements.”
- “Implement the enhancement in wiki/features/session-details.md, using a clearly labelled unconfirmed state until I provide real event details. Build, test, and update the wiki.”
- “Audit the wiki for stale claims, unsupported facts, and missing links. Run npm run check.”

Put original notes or source documents in `raw/`. Once registered in [the source manifest](raw/manifest.json), they stay unchanged; corrections go in a new dated file. An AI can summarize and connect those sources in `wiki/`. Use the [source template](templates/source.md) and [feature template](templates/feature.md) as guides.

## Publishing

The production address is <https://oslo-hack-mywork.vercel.app>. PR #1 was reviewed and merged, and its unconfirmed-meetup copy was deployed on 2026-10-22. PR #2 fixed production chatbot authentication. The previous primary domain was removed and verified to return HTTP 404; release outcomes are recorded in the wiki log. Git history and project source remain intact.

Build and check from the root before publishing. Deploy only `dist/` to the already linked `oslo-hack` Vercel project. Confirm the linked owner/project before deployment. The wiki and selected raw evidence are public repository documentation; they are not served as website routes or automatically included in AI context. Credentials and local reports stay excluded from GitHub. The GitHub CI workflow does not deploy or change the live website.

See [development and release](wiki/development.md) for the full workflow and [open questions](wiki/open-questions.md) before turning placeholder content into public claims.
