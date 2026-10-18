import { CdkTrapFocus } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_NAME } from '@core/routing/app-title-strategy';
import { EXACT_MATCH, NAV_ITEMS } from '../nav-items';

/**
 * Mobile slide-in menu (modal), opened by the hamburger in the header.
 * - Focus is trapped inside while open and returns to the hamburger on close (CDK a11y)
 * - Page behind cannot scroll while open
 * - Closes on Esc, backdrop click, link click
 */
@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive, CdkTrapFocus],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class Sidenav {
  private readonly document = inject(DOCUMENT);

  readonly open = input(false);
  readonly closed = output<void>();

  protected readonly appName = APP_NAME;
  protected readonly navItems = NAV_ITEMS;
  protected readonly exactMatch = EXACT_MATCH;

  constructor() {
    // Lock page scroll while open; cleanup also runs if this component is destroyed
    effect((onCleanup) => {
      const body = this.document.body;
      body.classList.toggle('scroll-locked', this.open());
      onCleanup(() => body.classList.remove('scroll-locked'));
    });
  }

  protected onEscape(): void {
    if (this.open()) {
      this.closed.emit();
    }
  }
}