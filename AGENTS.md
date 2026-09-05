# LIMIAR Agent Instructions

These instructions apply to every coding agent and model working in this repository.

## Required GitHub workflow

1. Every correction, improvement, maintenance task, or feature must have a GitHub Issue before implementation begins.
2. Search open and closed Issues before creating a new one. Update an existing Issue when it already covers the work.
3. Create a focused branch from the latest `main`. Include the Issue number in the branch name, for example `fix/42-station-loading`.
4. Keep one primary Issue per pull request unless the Issues are inseparable and the PR explains why.
5. Open a pull request for every change. Do not push implementation commits directly to `main`.
6. Mention the Issue in the PR description with `Closes #<issue-number>` or `Fixes #<issue-number>`.
7. Describe the user-visible effect, implementation, verification, and deployment risk in the PR.
8. Run all required checks locally. A PR may merge only after required GitHub Actions checks pass.
9. GitHub Pages deployments must come from reviewed changes merged into `main`, never from an unreviewed local bundle.
10. Confirm the production deployment after merge and record any deployment failure in the related Issue or a new bug Issue.

## Engineering constraints

- Preserve the static GitHub Pages architecture unless an approved Issue explicitly changes it.
- Keep Portuguese and English behavior aligned.
- Preserve deep links using `date`, `station`, `lang`, and `guide` query parameters.
- Do not manually edit generated station or monthly status JSON files. Change the generating pipeline and republish the bundle instead.
- Do not commit tokens, DSNs, API keys, local paths, or personal data.
- Use progressive loading and explicit loading, empty, success, and error states for asynchronous interfaces.
- Apply purposeful motion only where it communicates state or spatial continuity. Respect `prefers-reduced-motion`.
- Add or update tests for behavior changes. Bug fixes require a regression test when the behavior can be automated.
- Keep monitoring provider-neutral. Production observability must be optional and must not transmit station payloads.

## Pull request completion checklist

- The Issue and acceptance criteria are current.
- The branch contains only work required by the Issue.
- Formatting, linting, architecture checks, tests, and end-to-end tests pass when applicable.
- Desktop and mobile behavior were checked.
- Reduced-motion behavior was checked when motion changed.
- The PR description contains a closing reference to its Issue.
- The deployment and rollback risk are documented.
