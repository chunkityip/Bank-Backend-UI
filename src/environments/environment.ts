// Production settings (used by `ng build`).
// BANK-703 will change apiBaseUrl to '/api/v1' once nginx proxies the gateway.
export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:8080/api/v1',
};
