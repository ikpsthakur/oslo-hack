---
title: Open questions and content gaps
type: questions
status: current
updated: 2026-10-22
---

# Open questions and content gaps

## Visitor-facing facts

- Who is the organiser, and which public contact channel should be used?
- Is there a real next session? What are its date, time zone, venue, capacity, language, accessibility details, and cost?
- Should people reserve places, express interest, or simply arrive? There is currently no signup mechanism.
- Are there real projects to list or showcase, with permission to credit contributors?

The [baseline observation](../raw/2026-10-22-code-observation.md) records an old placeholder session date/venue. It is historical evidence, not a confirmed announcement. The [session-details change](features/session-details.md) removes that wording from current source and explicitly marks the meetup as unconfirmed; it still needs pull-request review and release before affecting production.

## Implementation and operation

- Gateway account eligibility is blocked as of 2026-10-22: a real request returned `403 customer_verification_required` and requested a credit card on file. The account owner must decide whether to complete that step; no payment details or paid purchases were added. Re-test generation afterward before claiming AI availability.
- The free model's provider may retain messages. Public notices must remain visible; internal notes and personal data must not be sent.
- If traffic grows, add platform-level rate limiting. The initial per-instance guard is not global abuse protection.
- A proposed feature MD file is a plan until it is implemented and tested. Accepted behavior needs code and release evidence.

Related: [roadmap](roadmap.md), [chatbot](features/chatbot.md), [project requirements](project.md).

