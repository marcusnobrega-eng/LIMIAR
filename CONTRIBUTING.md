# Contributing to LIMIAR

LIMIAR uses Issues and pull requests to keep every website deployment traceable and reviewable.

## Workflow

1. Search the repository Issues before starting work.
2. Create or update an Issue with the problem, scope, and acceptance criteria.
3. Update local `main` and create a branch containing the Issue number:

   ```bash
   git switch main
   git pull --ff-only origin main
   git switch -c fix/42-short-description
   ```

4. Make the smallest complete change that satisfies the Issue.
5. Run the checks documented in the README.
6. Push the branch and open a pull request using the repository template.
7. Include `Closes #42` in the PR description.
8. Merge only after review and required checks pass.
9. Confirm the GitHub Pages deployment after merge.

Direct implementation commits to `main` are not part of the project workflow. Each PR should have one clear purpose and a practical rollback path.

## Change categories

- **Correction:** fixes incorrect or broken behavior and includes a regression test when practical.
- **Improvement:** refines an existing behavior, interface, performance characteristic, or workflow.
- **New function:** adds a user-visible capability and documents its loading, empty, success, and error states.
- **Maintenance:** changes tooling, dependencies, deployment, tests, or documentation without intentionally changing the scientific interface.

## Generated data

Files under `data/stations/` and `data/status/` are generated assets. Do not patch individual JSON files. Make data corrections in the research pipeline, regenerate the complete bundle, and report the generated counts in the PR.

## Deployment

The public site is served through GitHub Pages. A production deployment begins only after a reviewed PR is merged into `main`. If deployment fails, keep the related Issue open or create a bug Issue that links to the failed run.
