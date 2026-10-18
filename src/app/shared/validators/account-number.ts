/**
 * Account numbers are 12 digits, zero-padded.
 * Matches account-service AccountServiceImpl.generateAccountNumber(): String.format("%012d", ...)
 */
export const ACCOUNT_NUMBER_PATTERN = /^\d{12}$/;
export const ACCOUNT_NUMBER_LENGTH = 12;