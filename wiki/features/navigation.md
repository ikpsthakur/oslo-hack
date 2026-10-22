---
title: Navigation
type: feature
status: implemented
updated: 2026-10-22
---

# Navigation

## Scope and current behavior

Header links target About, How it works, and Next session. Brand links return to the top; the skip link targets main content. The second nav item is hidden below the 850px breakpoint.

## Code and dependencies

Root [HTML](../../index.html): `.site-header`, `nav`, `#main`, section IDs. [CSS](../../style.css): header/nav/focus and responsive rules.

## Acceptance criteria

All visible links reach existing IDs. Keyboard users can reveal and use the skip link. Phone header stays usable without horizontal scrolling.

## Evidence and validation

Based on [project requirements](../project.md) and [baseline evidence](../sources/project-baseline.md). The documented baseline was inspected locally on 2026-10-22. Re-test affected behavior after changes; no fresh browser pass is implied by this page.

## Future changes

Record requested enhancements, updated criteria, and actual validation here. Follow [development](../development.md) and update [the index](../index.md) and [log](../log.md).

