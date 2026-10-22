---
title: GitHub and DevOps learning workflow
type: workflow
status: current
updated: 2026-10-22
---

# GitHub and DevOps learning workflow

## Purpose

The user asked to publish the Oslo Hack codebase in a public GitHub repository and use it to learn DevOps. This includes the website, project wiki, synthetic knowledge, build tools, and tests. The separate local bike project remains outside this repository. Public source access does not mean exposing credential files or deploying the development wiki as website routes.

Public repository: [ikpsthakur/oslo-hack](https://github.com/ikpsthakur/oslo-hack), created and verified public on 2026-10-22 after the user specified this account. See [Actions](https://github.com/ikpsthakur/oslo-hack/actions) for hosted checks and [the log](log.md) for setup history, including the earlier repository that remains untouched. Branch protection has not been configured as part of the bootstrap; use the pull-request convention described here.

## The small-change cycle

1. Describe one improvement in a GitHub issue or [feature Markdown file](index.md). Include observable acceptance criteria.
2. Update local `main` from GitHub and create a short-lived branch, for example `feature/session-copy`.
3. Implement the change in root source files. Update wiki knowledge and relevant tests, then rebuild `dist/`.
4. Commit and push the branch. A commit is a named snapshot; a branch is a line of work; a push uploads those commits.
5. Open a pull request to `main`. A pull request groups the changes for review and triggers the automated CI checks.
6. Review the diff and wait for the `Validate` check to pass. Fix failures on the same branch; pushing another commit reruns CI.
7. Merge when the change meets its criteria. A separate Vercel release is still needed to change the website visitors see.

## Example commands

The original `origin` remote is preserved for the earlier hosting system. The requested `ikpsthakur/oslo-hack` remote is named `github`. The prior account's remote is retained as `github-iaznexai` and is not this project's push destination. On a fresh GitHub clone, the GitHub remote will normally be called `origin` instead; use that name in the examples there.

```sh
git switch main
git pull --ff-only github main
git switch -c feature/session-copy
# Edit the relevant feature spec and website code.
npm run build
npm run check
npm test
# Stage the files you changed explicitly.
git add index.html dist/index.html wiki/features/session-details.md
npm run security:check
git commit -m "Clarify unconfirmed session details"
git push -u github feature/session-copy
gh pr create --repo ikpsthakur/oslo-hack --base main --fill
```

The stage list is an example; include all files actually affected by your change. Do not run the example as a script without making the corresponding changes.

## What CI means here

[The workflow](../.github/workflows/ci.yml) runs on pull requests, pushes to `main`, and manual dispatch. It uses Node.js 24 and a read-only GitHub token. It checks common credential patterns, validates the committed wiki/build, rebuilds the deployment files, verifies no generated changes were omitted, and runs the API/knowledge tests. No AI secret or Vercel token is needed for these checks.

CI means continuous integration: automatically checking that changes fit together. A green check proves these automated checks passed; it does not verify real model output, meetup facts, or every visual detail. Use [development checks](development.md) for browser validation and the [synthetic evaluation prompts](public/synthetic/evaluation.md) for later live AI evaluation.

## Delivery and deployment

For now the GitHub workflow tests code but does not publish it. Deploy only the built `dist/` folder to the existing Vercel project when a release is requested. Do not connect Vercel to the repository root with its current deployment configuration; that would change the deployment boundary. Adding automated releases should be a separate change with preview verification and an explicit root/build/output configuration.

The chatbot migration requires a new server-side OpenRouter key and a successful live provider test. CI uses mocks, not production credentials. Do not treat a CI pass as proving real replies. See [the chatbot specification](features/chatbot.md) and [no-card setup](sources/openrouter.md).

## Review rules

The first worked example is [PR #1](https://github.com/ikpsthakur/oslo-hack/pull/1): review the diff and green checks, merge into main, rebuild the exact merged commit, and deploy the allowlisted runtime folder. A production-only authentication bug was corrected through [PR #2](https://github.com/ikpsthakur/oslo-hack/pull/2), with three additional tests and CI before merge/release. The public site is https://oslo-hack-mywork.vercel.app. Live Gateway verification remains a separate operational check; green CI did not mean the external model account was ready.

Prefer pull requests and passing checks for `main`. If repository protection is configured, the log records the exact settings; this guide alone does not prove they are enabled. For a solo learning project, a second reviewer need not be mandatory. CI runs before merging; production release remains deliberate.
