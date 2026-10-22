---
title: Synthetic customer knowledge store
type: index
status: current
updated: 2026-10-22
dataset: synthetic
---

# Synthetic customer knowledge store

This is a fictional dataset for exercising the Oslo Hack visitor chatbot. It is not a record of real events, customers, bookings, policies, or available places. The user requested this store in [the captured request](../../../raw/2026-10-22-synthetic-store-request.md).

## Records to edit

| File | Records | Questions it supports |
| --- | --- | --- |
| [FAQs](faqs.md) | FAQ-001 to FAQ-008 | Beginners, skills, preparation, attending alone, scope, sharing, teams, demo access |
| [Sessions](sessions.md) | SESSION-001 to SESSION-002 | Example schedules, formats, venues, capacity, and costs |
| [Projects](projects.md) | PROJECT-001 to PROJECT-003 | Example ideas, skills needed, outcomes, and next tasks |
| [Participation](participation.md) | POLICY-001 to POLICY-004 | Example language, accessibility enquiries, respectful conduct, and photos |

## How the assistant uses this

The [source allowlist](../knowledge-sources.json) names exactly which Markdown files become chatbot context. Build compiles these records, with source paths and explicit synthetic labels, into the server-side API alongside [the public visitor guide](../visitor-guide.md). No database or embeddings are needed at this size.

The assistant must introduce answers from these records with “In this fictional demo…” or an equivalent phrase in the visitor's language. Questions about real dates, bookings, policies, people, or available spaces must still be answered as unconfirmed. The assistant can offer an explicitly labelled demo example, but must never call it the next actual event. It cannot reserve places or contact a team.

Example: “Show me an example beginner session” can use SESSION-001. “Is a real session booked this Saturday?” cannot be answered from that record.

## Add and enhance records

1. Edit the relevant Markdown file, keeping its `dataset: synthetic` metadata and visible fiction warning. Use a stable unique record ID, a title, and explicit sample-only status.
2. Keep statements internally consistent. Do not add real personal data, working contact details, booking links, or claims that a policy has been adopted.
3. For a new topic, create another labelled Markdown file and explicitly add it to the source allowlist and [wiki index](../../index.md). Files are never included just because they exist in this folder.
4. Run `npm run build`, `npm run check`, and `npm test`. A rebuild updates the local chat context; updating the live website requires a release.
5. To introduce real information, add verified facts to the public visitor guide with their evidence/date. Do not relabel fictional records as verified by changing their metadata.

Structural tests prove that the correct records reach the model request, not that an LLM always obeys the labels. [Evaluation prompts](evaluation.md) define the later live acceptance check; account verification currently blocks it. See [feature specification](../../features/synthetic-knowledge-store.md).
