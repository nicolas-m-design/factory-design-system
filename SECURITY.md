# Security Policy

## Supported Version

This repository is maintained from the latest state of the `main` branch. Older commits and historical snapshots are not considered supported release lines.

## Reporting a Vulnerability

Do not open a public issue for suspected security problems.

Use GitHub's private vulnerability reporting flow for this repository to submit a report privately to the maintainer.

When you report an issue, include:

- a short description of the vulnerability
- affected files, routes, or components
- clear reproduction steps
- impact and exploitation assumptions
- a suggested fix, if you already have one

The repository aims to acknowledge reports within 5 business days and will use best effort to keep reporters updated through the private report thread while the issue is being triaged and fixed.

## Scope

This project is a static React/Vite design-system site and token pipeline. Reports are most useful when they concern:

- accidental secret exposure
- unsafe GitHub Actions or dependency risks
- supply-chain concerns in the build or test workflow
- cross-site scripting or unsafe rendering behavior in the documentation app
- disclosure of private implementation details that should not be public
