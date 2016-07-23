import {div, a} from '@motorcycle/dom';

import {join} from './utils';

export
function renderListing(itemlist) {
  return div('.tiles', itemlist.map((c, i, arr) => {
    let href = join(window.location.hash.substr(1), c.name);
    if (c.type === 'directory') {
      href = `#${href}`;
    } else {
      href = join('/.file', href);
    }

    return div('.tiles__'+c.type, [
        a('.tiles__'+c.type+'-link', { props: { href: href } },[
          renderIcon(c.type),
          div('.tiles__label-wrapper', [
            div('.tiles__label', [c.name])
          ])
        ])
    ])
  }));
}

export
function renderIcon(type) {
  return div('.tiles__icon', [div('.icon-'+type)]);
}

export
function render(component) {
  return renderListing(component);
}
