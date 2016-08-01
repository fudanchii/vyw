/**
 * `join` supplied arguments with a slash,
 * create proper path.
 * @param {...string} fragments Path fragments to be joined.
 * @returns {string} The path.
 */
export function join(fragments) {
  let joindPath = Array.prototype.reduce.call(arguments, (p, c, i, a) => {
    return p + '/' + c;
  }, '/');
  return joindPath.replace(/\/{2,}/g, '/').trim();
}


/**
 * `hashToURL` converts hash, as typically returned by
 * window.location.hash, to the URL path of the directory
 * listing.
 * @param {string} hash The hash to convert from
 * @returns {string} The URL path
 */
export function hashToURL(hash) {
  const endpoint = window.vyw.listEndpoint;
  const path = hash.substr(1) === '' ? '/' : hash.substr(1);
  return endpoint.replace(/\/?<PATHNAME>/g, path);
}


/**
 * `pathForHref` returns URL to be used in href attribute.
 * This is needed because we will put hash URL in directory
 * item, and direct link to file for file item.
 * @param {string} current The current working path (cwd)
 * @param {Object} item The object representing file or
 *   directory.
 * @param {string} item.name The name of the file or directory
 * @param {string} item.type The type of the item
 * @returns {string} The URL for href attribute.
 */
export function pathForHref(current, item) {
  if (item.type === 'directory') {
    return `#${join(current, item.name)}`;
  }
  const fileUrl = window.vyw.fileEndpoint;
  return fileUrl.replace(/\/?<PATHNAME>/g, join(current, item.name));
}


const imgType = window.vyw.supportedImageType;

/**
 * `fileType` returns file type of the given object
 * @param {Object} c The object typically returned by nginx
 *   autoindex
 * @param {string} c.name The name of the item.
 * @param {string} c.type The type of the item, known possible
 *   value is either `directory` or `file`.
 * @returns {string} The type of this item. As currently this is
 *   only used to set image for images type. The output is only
 *   limited to either: `directory`, `image`, or `file`
 *   There's a chance more file type will returned in the near future.
 */
export function fileType(c) {
  if (c.type === 'directory') {
    return c.type;
  }
  if (imgType.includes(ext(c.name))) {
    return 'image';
  }
  return c.type;
}

function ext(name = '') {
  return name.substring(name.lastIndexOf('.') + 1);
}


/**
 * `byteSize` converts number with (K|M|G) suffix
 * to bytes.
 * @param {string|number} size Input size
 * @returns {number} The size in bytes
 */
export function byteSize(size) {
  const K = 1024,
        M = 1024 * K,
        G = 1024 * M;
  let prefix = size.charAt(size.length - 1);
  if (prefix.length) {
    size = 0 | size.substring(0, size.length - 1);
  }
  switch (prefix) {
  case 'K':
    return a * K;
  case 'M':
    return a * M;
  case 'G':
    return a * G;
  default:
    return a;
  }
}
