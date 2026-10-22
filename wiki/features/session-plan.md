---
title: Session plan toggle
type: feature
status: implemented
updated: 2026-10-22
---

# Session plan toggle

## Scope and current behavior

A button opens and closes a four-part illustrative schedule. This is the primary existing interactive feature and a good target for small enhancements.

## Code and dependencies

Root [HTML](../../index.html): `.plan-button`, `#session-plan`, `aria-controls`. [JavaScript](../../script.js): `planButton` handler. [CSS](../../style.css): hidden schedule and expanded icon rules.

## Acceptance criteria

Initially hidden with aria-expanded=false. First activation shows the agenda and Hide session plan; second activation restores the initial state. Native button supports keyboard activation. Keep the visible agenda consistent with [public chat knowledge](../public/visitor-guide.md).

## Evidence and validation

Based on [project requirements](../project.md) and [baseline evidence](../sources/project-baseline.md). The documented baseline was inspected locally on 2026-10-22. Re-test affected behavior after changes; no fresh browser pass is implied by this page.

## Future changes

Record requested enhancements, updated criteria, and actual validation here. Follow [development](../development.md) and update [the index](../index.md) and [log](../log.md).

