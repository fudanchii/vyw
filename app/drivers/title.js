/**
 * @returns {Function} Driver to set `document.title`.
 */
export function makeTitleDriver() {
  return titleDriver;
}

/**
 * Transform given input into title string for `appName`.
 * @param {string} from The dynamic part of title.
 * @param {string} appName Application name to put on the title.
 * @returns {string} Title string.
 */
export function title(from, appName) {
  let t = from.substr(1) === '' ? '/' : from.substr(1);
  return t + ' | ' + appName;
}

function titleDriver(title$) {
  title$
    .observe(title => document.title = title);
}
