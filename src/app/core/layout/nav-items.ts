import { IsActiveMatchOptions } from '@angular/router';

/** One navigation entry. `children` are shown in the sub-nav when this section is active. */
export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly children?: readonly NavItem[];
}

/**
 * Single source of truth for navigation. Header, SubNav and the mobile menu all read from here,
 * so adding a page = adding one entry (like a config class in Java).
 */
export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Accounts',
    path: '/accounts',
    children: [
      { label: 'Account details', path: '/accounts' },
      { label: 'Open account', path: '/accounts/new' },
    ],
  },
  {
    label: 'Transfer',
    path: '/transfer',
    children: [{ label: 'New transfer', path: '/transfer' }],
  },
  {
    label: 'History',
    path: '/history',
    children: [{ label: 'Transactions', path: '/history' }],
  },
  {
    label: 'Payment',
    path: '/payment',
    children: [{ label: 'Top up', path: '/payment' }],
  },
];

/** Section is active for its path AND anything below it: /accounts matches /accounts/new. */
export const SECTION_MATCH: IsActiveMatchOptions = {
  paths: 'subset',
  queryParams: 'ignored',
  matrixParams: 'ignored',
  fragment: 'ignored',
};

/** Sub-link is active on its exact path only, ignoring ?q= so /accounts?q=... still counts. */
export const EXACT_MATCH: IsActiveMatchOptions = {
  ...SECTION_MATCH,
  paths: 'exact',
};
