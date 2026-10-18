import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ACCOUNT_NUMBER_LENGTH, ACCOUNT_NUMBER_PATTERN } from '@shared/validators/account-number';
import { filter, map } from 'rxjs';
import { EXACT_MATCH, NAV_ITEMS, SECTION_MATCH } from '../nav-items';

/** Second header row: links of the current section + account number search. */
@Component({
  selector: 'app-sub-nav',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './sub-nav.html',
  styleUrl: './sub-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubNav {
  private readonly router = inject(Router);

  protected readonly exactMatch = EXACT_MATCH;
  protected readonly accountNumberLength = ACCOUNT_NUMBER_LENGTH;

  // ---------- Section links ----------

  /** Current URL as a signal; emits after every successful navigation. */
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Children of the active section, e.g. on /accounts/new -> Account details, Open account. */
  protected readonly links = computed(() => {
    this.url(); // dependency: re-run whenever the URL changes
    const section = NAV_ITEMS.find((item) => this.router.isActive(item.path, SECTION_MATCH));
    return section?.children ?? [];
  });

  // ---------- Search ----------

  protected readonly searchForm = new FormGroup({
    accountNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(ACCOUNT_NUMBER_PATTERN)],
    }),
  });

  /** Only show the error after a submit attempt, not while the user is still typing. */
  protected readonly showSearchError = signal(false);

  protected search(): void {
    const control = this.searchForm.controls.accountNumber;
    control.setValue(control.value.trim());

    if (control.invalid) {
      this.showSearchError.set(true);
      return;
    }

    this.showSearchError.set(false);
    // BANK-202: the Accounts page reads ?q= (as a component input) and loads the account
    void this.router.navigate(['/accounts'], { queryParams: { q: control.value } });
  }

  protected clearSearchError(): void {
    this.showSearchError.set(false);
  }
}