---
title: Session details
type: feature
status: implemented
updated: 2026-10-22
---

# Session details

## Scope and current behavior

The existing page displays a sample date, time, venue, and availability label. These are placeholders, not confirmed operational facts. Priority enhancement: display an explicit unconfirmed state until the organiser supplies real details.

## Code and dependencies

Root [HTML](../../index.html): `#session`, `.session-date`, `.session-place`, `.availability`. See [open questions](../open-questions.md).

## Acceptance criteria

When enhanced, no stale placeholder is presented as a confirmed meetup. A real date includes a correct weekday, year, and Europe/Oslo time. Venue/address claims require confirmation. The chatbot must use the same confirmation state.

## Evidence and validation

Based on [project requirements](../project.md) and [baseline evidence](../sources/project-baseline.md). The documented baseline was inspected locally on 2026-10-22. Re-test affected behavior after changes; no fresh browser pass is implied by this page.

## Future changes

Record requested enhancements, updated criteria, and actual validation here. Follow [development](../development.md) and update [the index](../index.md) and [log](../log.md).

