import { intlFormat, isValid, parseISO } from 'date-fns';

export function formatIsoDateString(
  isoDate: string,
  includeTime = true,
): string {
  const date = parseISO(isoDate);

  if (!isValid(date)) {
    // todo: notify backend about error?
    return '';
  }

  let formatOptions: FormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const locale = 'de-DE'; // todo: find locale

  if (includeTime) {
    formatOptions = {
      ...formatOptions,
      hour: '2-digit',
      minute: '2-digit',
    };
  }

  return intlFormat(date, formatOptions, {
    locale,
  });
}

type FormatOptions = {
  localeMatcher?: 'lookup' | 'best fit';
  weekday?: 'narrow' | 'short' | 'long';
  era?: 'narrow' | 'short' | 'long';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'short' | 'long';
  formatMatcher?: 'basic' | 'best fit';
  hour12?: boolean;
  timeZone?: string;
};
