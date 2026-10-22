---
title: Session details
type: feature
status: implemented
updated: 2026-10-22
---

# Session details

## Scope and current behavior

The website source now displays "Next meetup not confirmed", "Details pending", and "Date, time, and venue are still to be confirmed." The old sample date and Grünerløkka venue wording have been removed. The expandable agenda remains usable, with an explicit example-only notice. The chatbot knowledge describes the same unconfirmed state.

Requested by the user on 2026-10-22 as the first branch-and-pull-request exercise. This describes the change on `fix/unconfirmed-meetup`, not a production deployment.

## Code and dependencies

Root [HTML](../../index.html): `#session`, `.session-date`, `.session-place`, `.availability`. See [open questions](../open-questions.md).

## Acceptance criteria

No placeholder date, venue, or availability claim is presented as a confirmed meetup. The example agenda is explicitly labelled. If actual details are supplied later, a real date includes a correct weekday, year, and Europe/Oslo time, and venue/address claims require confirmation. The chatbot must use the same confirmation state.

## Evidence and validation

Based on [project requirements](../project.md), [baseline evidence](../sources/project-baseline.md), and the user's explicit request to replace placeholder session details with an unconfirmed message. See [the log](../log.md) for actual validation and pull-request results. No merge or production release is implied by this feature's implemented status.

## Future changes

Record requested enhancements, updated criteria, and actual validation here. Follow [development](../development.md) and update [the index](../index.md) and [log](../log.md).

