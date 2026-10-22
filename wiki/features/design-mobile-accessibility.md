---
title: Design, phone support, and accessibility
type: feature
status: implemented
updated: 2026-10-22
---

# Design, phone support, and accessibility

## Scope and current behavior

Shared design uses dark #161616, paper #f4f1e8, off-white #fffdf8, and lime #c8f43d. CSS has responsive breakpoints, visible focus styles, and a reduced-motion rule. This documents existing support, not an assertion of a full accessibility audit.

## Code and dependencies

Root [CSS](../../style.css): tokens, media queries, focus and reduced-motion rules. [HTML](../../index.html): viewport, landmarks, headings, labels, alt text.

## Acceptance criteria

Check 375px and desktop width, no horizontal overflow, readable text and controls, keyboard focus, accessible names, reduced motion, and contrast after relevant design changes. Chat must not cover navigation or cause a phone keyboard trap.

## Evidence and validation

Based on [project requirements](../project.md) and [baseline evidence](../sources/project-baseline.md). The documented baseline was inspected locally on 2026-10-22. Re-test affected behavior after changes; no fresh browser pass is implied by this page.

## Future changes

Record requested enhancements, updated criteria, and actual validation here. Follow [development](../development.md) and update [the index](../index.md) and [log](../log.md).

