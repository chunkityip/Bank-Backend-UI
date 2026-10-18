// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Each feature is lazy-loaded: its code is only downloaded when the user opens that page.
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accounts' },
  {
    path: 'accounts',
    loadChildren: () =>
      import('@features/accounts/accounts.routes').then((m) => m.ACCOUNTS_ROUTES),
  },
  {
    path: 'transfer',
    loadChildren: () =>
      import('@features/transfer/transfer.routes').then((m) => m.TRANSFER_ROUTES),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('@features/history/history.routes').then((m) => m.HISTORY_ROUTES),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('@features/payment/payment.routes').then((m) => m.PAYMENT_ROUTES),
  },
  // BANK-102 replaces this with a proper 404 page
  { path: '**', redirectTo: 'accounts' },
];