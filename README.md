# LIMIAR

LIMIAR is a static public interface for exploring reconstructed flood signals at ANA gauge stations across Brazil.

The website publishes a browser-ready bundle with precomputed station data, daily status summaries, hydraulic context, and station-level evidence panels. It supports historical analysis, scientific communication, and hypothesis development, not operational real-time warning.

## Website

GitHub Pages deployment:

`https://marcusnobrega-eng.github.io/LIMIAR/`

## What this repository contains

This repository is the publishable website bundle only. It is not the full research or Zenodo package.

Main contents:

- `index.html`: static site entry point
- `app.js`: client-side application logic
- `styles.css`: site styling
- `observability.js`: optional provider-neutral browser observability adapter
- `assets/`: logo and published QA panel images
- `vendor/`: third-party browser libraries bundled with the site
- `data/`: prebuilt station and daily status assets consumed by the frontend

## What LIMIAR lets you do

- search stations by date, name, code, UF, basin, biome, and recommended-use class
- view daily station condition on the national map
- inspect station metadata and threshold basis
- explore time series, dynamic thresholds, annual maxima, cross sections, and rating-curve context
- export station-level summaries and CSV outputs from the web interface

## Status logic shown in LIMIAR

Daily station classes are derived from precomputed thresholds and cached daily values:

- `Normal`
- `Alerta / Warning`
- `Inundada / Flooded`
- `Extrema / Extreme flooding`
- `Sem dados / No data`

Threshold basis is exposed in the interface so users can distinguish between:

- observed hydraulic evidence
- stations using Q2 thresholds
- alert and severe statistical thresholds

## Important interpretation note

LIMIAR presents historical records for analysis and communication. It should not be interpreted as an official warning platform or as a substitute for local validation, field review, or operational flood forecasting systems.

## Published data snapshot

- stations published: 2,610
- daily support range: 1911-01-27 to 2025-12-31
- month status files: 1,352
- station JSON files: 2,610
- QA panels copied: 80

## Update workflow

The website bundle published here is generated from the main research workspace and then synchronized into this repository for GitHub Pages deployment. Every correction, improvement, maintenance task, and new function must begin with a GitHub Issue and be delivered through a pull request that closes that Issue. See [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md).

Production monitoring is optional and disabled by default. See [OBSERVABILITY.md](OBSERVABILITY.md) for the Sentry, Datadog, New Relic, and OpenTelemetry adapters and privacy constraints.

## Development checks

Install the pinned development tools with `npm ci`, then run `npm run lint`. The quality workflow checks JavaScript with Biome, unused dependencies with Knip, and dependency boundaries with ArchContract. Commit messages in pull requests follow Conventional Commits and are checked with Commitlint.

In practice:

- research processing happens in the main project workspace
- browser-ready assets are written to the website bundle
- the updated bundle is copied into this repository
- changes are committed to an Issue-specific branch
- a pull request references and closes the Issue
- checks and review complete before merge
- GitHub Pages deploys the reviewed `main` branch
