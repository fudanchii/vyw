import {div, a} from '@motorcycle/dom';

import {join, fileType, pathForHref} from './utils';
import {thumbnail} from './thumbnail';

/**
 * `renderTiles` renders file as icon tiles. The actual
 * path / URL for each file rendered will be concatenated
 * with the current path as represented in window.location.hash.
 * @param {Object[]} itemlist This is the list returned by
 *   nginx for directory listing.
 * @param {string} itemlist[].name File name or directory name.
 * @param {string} itemlist[].type Item type,
 *   either `directory` or `file`.
 * @return {VDOM} The DOM structure of the tiles.
 */
export function renderTiles(itemlist) {
  const current = window.location.hash.substr(1);
  return div('.tiles', itemlist.map((c, i, arr) => {
    const href = pathForHref(current, c);
    c.type = fileType(c);
    return div(`.tiles__${c.type}`, [
      a(`.tiles__${c.type}-link`, { props: { href: href } },[
        renderIcon(c, href),
        div('.tiles__label-wrapper', [div('.tiles__label', [c.name])])
      ])
    ]);
  }));
}


/**
 * render `div.tiles__icon`, that is,
 * the icon used in tiles layout. This will display
 * thumbnail if the supplied content is an image.
 * @param {Object} content File item, needed to infer
 *   the file type.
 * @param {string} content.name File or directory name.
 * @param {string} content.type File or directory type.
 * @param {string} content.size File or directory size.
 * @param {string} href The actual path of the file /
 *   directory listing.
 * @return {VDOM} The DOM for the tile icon.
 */
export function renderIcon(content, href) {
  let attr = { props: {} };
  if (content.type === 'image') {
    attr.props['style'] = `background-image: url("${thumbnail(content, href)}");`;
  }
  return div('.tiles__icon', [div(`.icon-${content.type}`, attr)]);
}


/**
 * `render` is the main render method,
 * typically we only need to call this from
 * our main stream-loop, But currently only
 * renderTiles implemented.
 * @param {Object[]} items List of item to render
 * @return {VDOM} the DOM representation of the whole layout
 */
export function render(items) {
  return renderTiles(items);
}
