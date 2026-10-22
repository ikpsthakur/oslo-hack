---
title: Oslo Hack project wiki
type: index
status: current
updated: 2026-10-22
---

# Oslo Hack project wiki

Start with [project scope](project.md), then choose a feature file. These files are project memory and specifications; editing a spec does not execute or publish code.

## Current website features

| Target file | Responsibility |
| --- | --- |
| [navigation.md](features/navigation.md) | Header, section anchors, home and skip links |
| [hero-intro.md](features/hero-intro.md) | Headline, photo, introduction, call to action |
| [meet-build-share.md](features/meet-build-share.md) | Three-step explanation |
| [session-details.md](features/session-details.md) | Session date, time, venue, confirmation state |
| [session-plan.md](features/session-plan.md) | Expand/collapse schedule and agenda |
| [footer.md](features/footer.md) | Brand, return-to-top link, automatic year |
| [design-mobile-accessibility.md](features/design-mobile-accessibility.md) | Shared design tokens, responsive layout, keyboard access |
| [chatbot.md](features/chatbot.md) | Nemotron FAQ assistant and public knowledge |
| [synthetic-knowledge-store.md](features/synthetic-knowledge-store.md) | Markdown demo data compiled into chatbot context |

## Proposed additions

- [signup.md](features/signup.md): join a session once a real contact/destination exists.
- [project-ideas.md](features/project-ideas.md): example projects and skills needed.
- [idea-submissions.md](features/idea-submissions.md): submit an idea; delivery mechanism undecided.
- [showcase.md](features/showcase.md): completed work, credited with permission.
- [host-contact.md](features/host-contact.md): verified organiser and contact details.

## Project knowledge

- [Project](project.md): purpose, confirmed constraints, and authority.
- [Architecture](architecture.md): root source, deployment boundary, and chatbot path.
- [Development](development.md): preview, verification, and release.
- [GitHub and DevOps](github-devops.md): branches, pull requests, automated checks, and releases.
- [Roadmap](roadmap.md): suggested sequence and dependencies.
- [Open questions](open-questions.md): unknowns and stale content.
- [Public chatbot knowledge](public/visitor-guide.md): baseline facts and explicit unknowns for actual Oslo Hack questions.
- [Synthetic store index](public/synthetic/index.md): fictional data catalogue and editing instructions.
- [Synthetic FAQs](public/synthetic/faqs.md): eight example visitor questions and answers.
- [Synthetic sessions](public/synthetic/sessions.md): two sample workshop formats; no confirmed events.
- [Synthetic projects](public/synthetic/projects.md): three example projects and beginner tasks.
- [Synthetic participation](public/synthetic/participation.md): four hypothetical participation scenarios.
- [Knowledge evaluations](public/synthetic/evaluation.md): manual answer-boundary cases; excluded from model context.
- [LLM Wiki decision](decisions/001-project-wiki.md): why memory is stored in Markdown.
- [Source and deployment decision](decisions/002-source-and-build.md): root is canonical.
- [Evidence summary](sources/project-baseline.md): origins of requirements and observations.
- [Gateway evidence](sources/ai-gateway.md): model discovery and integration references.
- [OpenRouter setup](sources/openrouter.md): approved free-only migration, no-card key instructions, privacy, and limits.
- [Log](log.md): chronological record of substantive work.

## Add or change a feature

Copy [the feature template](../templates/feature.md) to `wiki/features/a-clear-name.md`, add it here, and ask the agent to implement it. Existing features can be targeted directly: “Enhance session-plan.md to add a lunch break.” Use [AGENTS.md](../AGENTS.md) for ingest/query/audit conventions.

