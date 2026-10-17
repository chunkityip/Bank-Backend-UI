// Development settings (used by `ng serve`). Replaces environment.ts at build time.
// All calls go through the API Gateway on port 8080.
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api/v1',
};
