import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { BREAKPOINTS } from '@core/layout/breakpoints';
import { Header } from '@core/layout/header/header';
import { Sidenav } from '@core/layout/sidenav/sidenav';
import { SubNav } from '@core/layout/sub-nav/sub-nav';
import { filter } from 'rxjs';

/**
 * App shell. Owns the mobile-menu state ("smart" container);
 * Header and Sidenav only receive it via inputs and report clicks via outputs ("dumb" children).
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SubNav, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected readonly menuOpen = signal(false);

  constructor() {
    // Close the menu on any navigation (link click, Back button, programmatic navigate)
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());

    // Close the menu when the screen grows to desktop size (menu doesn't exist there)
    this.breakpointObserver
      .observe(BREAKPOINTS.desktop)
      .pipe(
        filter((state) => state.matches),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}