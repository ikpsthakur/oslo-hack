# Local code observation

Observed on 2026-10-22 in `/Users/kthakur/Documents/New project 2` before wiki conversion.

- Tracked baseline commit: `5306296` (`Restore dark hero in Oslo Hack poster design`).
- Root `index.html`, `style.css`, `script.js`, and `photo.jpg` have byte-identical counterparts under `dist/`, confirmed by SHA-256.
- HTML has navigation, hero/photo, introduction, Meet/Build/Share, next-session details, a hidden schedule, and a footer.
- `script.js` toggles `aria-expanded`, the schedule's `hidden` property, and the button label. It also sets the footer year at runtime.
- CSS uses `--ink: #161616`, `--paper: #f4f1e8`, `--white: #fffdf8`, and `--accent: #c8f43d`, with phone breakpoints.
- The displayed session text is “Saturday, 12 October · 10:00–15:00” and “Community room near Grünerløkka / Exact address shared before the session”. These are placeholder details, not evidence of a confirmed event. In 2026, October 12 is a Monday, so the copy should not be treated as a current real schedule.
- `dist/.vercel/project.json` identifies project `oslo-hack`, ID `prj_Ekv8dnWFY8ri8qqW3YGRifnZ0tHs`, team `team_LiffGbDewlCcvv9ITYLYxTEH`. These are identifiers, not credentials.
- Existing `.openai/hosting.json` points to `dist/` for the earlier Sites hosting. Keep that configuration intact.
- The previously published Vercel address is `https://oslo-hack-livid.vercel.app`. No live availability test was performed for this conversion.
- Existing `oslo-bike-finder/` and untracked files were present and are outside the conversion scope.

## Website SHA-256 baseline

Filled in the separate immutable source manifest for raw documents; the executable website remains editable. Use Git history for the website baseline and future diffs, not a frozen raw copy of the application.
