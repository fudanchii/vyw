import {div, a} from '@motorcycle/dom';

import {join} from './utils';

export
function render(itemlist) {
  return div('.tiles', itemlist.map((c, i, arr) => {
    let href = `#${join(window.location.hash.substr(1), c.name)}`;

    if (c.type === 'directory') {
      href = href + '/';
    }

    return div('.tiles__'+c.type, [
        a('.tiles__'+c.type+'-link', { props: { href: href } },[c.name])
    ])
  }));
}
