import { inject , Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

export const APP_NAME = 'Bank';
/** Initials shown in the round logo next to the name in the header. */
export const APP_MARK = 'CK';

// Control how browser tab display
/**
 * if I click Accounts , the tab will display Accounts | Bank
 * if I click transfer , the tab will display Transfer | Bank
 */

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);
    this.title.setTitle(routeTitle ? `${routeTitle} | ${APP_NAME}` : APP_NAME);
  }
}
