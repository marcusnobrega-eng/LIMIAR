# LIMIAR

LIMIAR is a static public atlas for exploring reconstructed flood signals at ANA gauge stations across Brazil.

The website publishes a browser-ready bundle with precomputed station data, daily status summaries, hydraulic context, and station-level diagnostic panels. It is intended for historical analysis, screening, communication, and hypothesis generation, not for operational real-time warning.

## Website

GitHub Pages deployment:

`https://marcusnobrega-eng.github.io/LIMIAR/`

## What this repository contains

This repository is the publishable website bundle only. It is not the full research or Zenodo package.

Main contents:

- `index.html`: static site entry point
- `app.js`: client-side application logic
- `styles.css`: site styling
- `assets/`: logo and published QA panel images
- `vendor/`: third-party browser libraries bundled with the site
- `data/`: prebuilt station and daily status assets consumed by the frontend

## What the atlas lets you do

- search stations by date, name, code, UF, basin, biome, and recommended-use class
- view daily station condition on the national map
- inspect station metadata and threshold basis
- explore time series, dynamic thresholds, annual maxima, cross sections, and rating-curve context
- export station-level summaries and CSV outputs from the web interface

## Status logic shown in the atlas

Daily station classes are derived from precomputed thresholds and cached daily values:

- `Normal`
- `Alerta / Warning`
- `Inundada / Flooded`
- `Extrema / Extreme flooding`
- `Sem dados / No data`

Threshold basis is exposed in the interface so users can distinguish between:

- observed hydraulic evidence
- Q2 fallback cases
- alert and severe statistical thresholds

## Important interpretation note

LIMIAR is a historical and screening-oriented product. It should not be interpreted as an official warning platform or as a substitute for local validation, field review, or operational flood forecasting systems.

## Published data snapshot

- stations published: 2,610
- daily support range: 1911-01-27 to 2025-12-31
- month status files: 1,352
- station JSON files: 2,610
- QA panels copied: 80

## Update workflow

The website bundle published here is generated from the main research workspace and then synchronized into this repository for GitHub Pages deployment.

In practice:

- research processing happens in the main project workspace
- browser-ready assets are written to the website bundle
- the updated bundle is copied into this repository
- changes are committed and pushed to `main`
- GitHub Pages deploys the public site
