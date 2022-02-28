import { Observable, of, Subscriber } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { ShareButtonFuncArgs } from './share.models';

/**
 * Simple object check.
 */
function isObject(item): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {[key]: {}});
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {[key]: source[key]});
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/** Returns a valid URL or falls back to current URL */
export function getValidUrl(url: string, fallbackUrl: string): string {
  if (url) {
    const r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (r.test(url)) {
      return url;
    }
    console.warn(`[ShareButtons]: Sharing link '${ url }' is invalid!`);
  }
  return fallbackUrl;
}

export function printPage(): Observable<void> {
  return new Observable((sub: Subscriber<any>) => document.defaultView.print());
}

export function copyToClipboard({params, data, clipboard, updater}: ShareButtonFuncArgs<CopyToClipboardDataArgs>): Observable<void> {
  return of(null).pipe(
    tap(() => {
      clipboard.copy(params.url);
      // Disable copy button
      updater.next({icon: data.successIcon, text: data.successText, disabled: true});
    }),
    delay(data.delay),
    tap(() => updater.next({icon: data.icon, text: data.text, disabled: false})),
    take(1)
  );
}

interface CopyToClipboardDataArgs {
  delay: number;
  text: string;
  icon: string[];
  successText: string;
  successIcon: string[];
}
