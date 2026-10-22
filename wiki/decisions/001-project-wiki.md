---
title: ADR 001: Local project wiki
type: decision
status: accepted
updated: 2026-10-22
---

# ADR 001: Local project wiki

Date: 2026-10-22.

The [user request](../../raw/2026-10-22-user-requirements.md) authorizes adapting the project to a Karpathy-style LLM Wiki. Keep original evidence, compiled project knowledge, and agent conventions separate. Use ordinary relative Markdown links so the files work in editors and Obsidian without a special runtime.

Provide a dedicated file per feature, templates for additions, an index, an append-only log, and mechanical checks. The AI maintains this memory during requested work; there is no unattended process.

Tradeoff: Markdown specifications improve continuity but do not implement UI by themselves. Code, tests, and deployment remain explicit steps. A later data-driven feature may choose Markdown as runtime input; only the chatbot's curated public guide does so initially.

Related: [project](../project.md), [source summary](../sources/project-baseline.md), [LLM Wiki reference](../../raw/2026-10-22-llm-wiki-reference.md).

