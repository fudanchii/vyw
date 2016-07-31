import {join, byteSize} from './utils';

/**
 * `thumbnail` generates url for thumbnail size of image.
 * It reads `thumbnailer` property from config which possibly
 * contains:
 * <ul>
 * <li>`original-image`
 * <li>URL template for thumbnail services
 * </ul>
 * For example, to use rsz.io service you can specify this
 * in your vyw.config file:
 * <pre>
 *    thumbnailer: (my.domain).rsz.io<FILEPATH>?width=256&format=webp
 * </pre>
 * where `(my.domain)` is to be replaced with your own.
 *
 * @param {Object} source The hash object for single item
 *   from a list returned by nginx.
 * @param {string|number} source.size The size of the file.
 * @param {string} href Pointer to the real path of the file.
 * @return {string} URL to the thumbnail image.
 */
export function thumbnail(source, href) {
  if (window.vyw.thumbnailer === 'original-image' &&
      byteSize(window.vyw.maxSize) >= (0|source.size)) {
    return href;
  }
  return genThumbnail(href);
}

function genThumbnail(href) {
  var path, url, hostname, host;
  try {
    if (href.indexOf('//') === 0) {
      href = window.location.protocol + href;
    }
    url = new URL(href);
    path = url.pathname;
  } catch (e) { /* href doesn't specify domain */
    path = href;
    url = window.location;
  }
  host = url.host;
  hostname = url.hostname;
  return window.vyw.thumbnailer
    .replace(/<HOST>/g, host)
    .replace(/<HOSTNAME>/g, hostname)
    .replace(/\/?<PATHNAME>/g, path);
}
