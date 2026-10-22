# Working on Oslo Hack

Start with [the wiki index](wiki/index.md) and the feature page you want to change. Read [AGENTS.md](AGENTS.md) when using an AI assistant.

Use the [GitHub and DevOps guide](wiki/github-devops.md) for the branch, pull request, CI, and release workflow. `main` is the shared baseline; make each new feature on a short-lived branch and review it through a pull request.

The website has no npm dependencies. Use Node.js 24, edit root source files, then run:

```sh
npm run build
npm run check
npm test
npm run security:check
```

Commit relevant source, wiki, tests, and generated `dist/` files together. Keep credentials, `.env.local`, `.vercel`, personal data, and the separate bike project out of commits. Synthetic examples must remain explicitly labelled.

GitHub Actions validates changes without real AI credentials. The existing Vercel account-verification blocker is separate from CI. A merged pull request does not currently deploy to production automatically.
