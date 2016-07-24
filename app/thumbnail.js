import {join, byteSize} from './utils';

/*
 * `thumbnail` generates url for thumbnail size of image.
 * It reads `thumbnailer` property from config which possibly
 * contains:
 * <ul>
 * <li>`local`
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
  if (window.vyw.thumbnailer === 'local' &&
      byteSize(window.vyw.maxSize) >= (0|source.size)) {
    return href;
  }
  return genThumbnail(href);
}

function genThumbnail(href) {
  return window.vyw.thumbnailer.replace(/<FILEPATH>/g, href);
}
