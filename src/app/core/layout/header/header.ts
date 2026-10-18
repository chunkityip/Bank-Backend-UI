import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_MARK, APP_NAME } from '@core/routing/app-title-strategy';
import { NAV_ITEMS } from '../nav-items';

/** Top bar: brand, primary navigation (desktop), action buttons, hamburger (mobile). */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly menuOpen = input(false);
  readonly menuToggle = output<void>();

  protected readonly appName = APP_NAME;
  protected readonly appMark = APP_MARK;
  protected readonly navItems = NAV_ITEMS;
}