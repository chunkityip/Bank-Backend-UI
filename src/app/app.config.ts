import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { AppTitleStrategy } from '@core/routing/app-title-strategy';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // No zone.js: change detection is driven by signals (stable since Angular 20.2)
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      // Route/query params (e.g. ?q=) can be read as component inputs
      withComponentInputBinding(),
      // Scroll to top on new page, restore position on Back
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    // Browser tab title: "<route title> | Bank"
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};