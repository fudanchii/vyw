import {join} from './utils';

export
function thumbnail(source, href) {
  if (window.vyw.thumbnailer === 'local' &&
      byteSize(window.vyw.maxSize) >= (0+source.size)) {
    return href;
  }
  return genThumbnail(href);
}

function genThumbnail(href) {
  return window.vyw.thumbnailer.replace(/<FILEPATH>/g, href);
}
