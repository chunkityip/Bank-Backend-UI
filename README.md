# Bank UI

Angular 20 frontend for the [bank](https://github.com/chunkityip/bank) microservices backend.
All API calls go through the API Gateway at `http://localhost:8080/api/v1`.

## Requirements

- Node.js 20.19+, 22.12+ or 24+
- Backend running (`docker-compose up` + each Spring Boot service)

## Commands

| Command                | What it does                               |
| ---------------------- | ------------------------------------------ |
| `npm install`          | Install dependencies (first time only)     |
| `npm start`            | Run dev server at http://localhost:4200    |
| `npm run build`        | Production build into `dist/`              |
| `npm test`             | Unit tests (Karma + Jasmine, needs Chrome) |
| `npm run lint`         | ESLint (TypeScript + HTML templates)       |
| `npm run format`       | Format all files with Prettier             |
| `npm run format:check` | Check formatting without changing files    |

## Folder structure

```
src/
├── environments/
│   ├── environment.ts               # production (ng build)
│   └── environment.development.ts   # development (ng serve)
└── app/
    ├── core/                        # app-wide singletons, used once
    │   ├── interceptors/            # HTTP interceptors (BANK-103)
    │   ├── services/                # API services (BANK-103)
    │   └── models/                  # TypeScript models matching backend DTOs
    ├── shared/                      # reusable UI pieces, used by many features
    │   ├── components/
    │   └── pipes/
    ├── features/                    # one folder per business feature, lazy-loaded
    │   ├── accounts/
    │   │   ├── accounts.routes.ts
    │   │   └── pages/accounts-page/ (.ts / .html / .css)
    │   ├── transfer/
    │   ├── history/
    │   └── payment/
    ├── app.routes.ts                # top-level routes -> loadChildren per feature
    ├── app.config.ts
    └── app.ts / app.html / app.css
```

## Conventions

- Standalone components only; every component keeps its `.ts`, `.html` and `.css` in separate files (enforced by ESLint).
- Angular 20 file naming: `accounts-page.ts` (no `.component` suffix).
- Import with path aliases instead of `../../..`: `@core/*`, `@shared/*`, `@features/*`, `@env/*`.
- Read the API URL from `environment.apiBaseUrl`, never hard-code it.

## Routes

| URL         | Feature             |
| ----------- | ------------------- |
| `/accounts` | Accounts (default)  |
| `/transfer` | Transfer            |
| `/history`  | Transaction history |
| `/payment`  | Payment             |
