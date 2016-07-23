import {div, a} from '@motorcycle/dom';

import {join, fileType} from './utils';

import {thumbnail} from './thumbnail';

export
function renderListing(itemlist) {
  return div('.tiles', itemlist.map((c, i, arr) => {
    let href = join(window.location.hash.substr(1), c.name);
    if (c.type === 'directory') {
      href = `#${href}`;
    } else {
      href = join(window.vyw.filePrefix, href);
    }

    return div('.tiles__'+c.type, [
        a(`.tiles__${c.type}-link`, { props: { href: href } },[
          renderIcon(c, href),
          div('.tiles__label-wrapper', [div('.tiles__label', [c.name])])
        ])
    ])
  }));
}

export
function renderIcon(content, href) {
  const type = fileType(content);
  let attr = { props: {} };
  if (type === 'image') {
    attr.props['style'] = `background-image: url("${thumbnail(content, href)}");`;
  }
  return div('.tiles__icon', [div(`.icon-${type}`, attr)]);
}

export
function render(component) {
  return renderListing(component);
}
