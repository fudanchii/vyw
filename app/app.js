import Cycle from '@cycle/most-run';
import {makeDOMDriver, div, pre} from '@motorcycle/dom';
import {makeHTTPDriver} from '@motorcycle/http';

const EMPTY_DIR_LIST = [{}];

function render(itemlist) {
  return div('.tiles', itemlist.map((c, i, a) =>
        div('.tiles__'+c.type, [
          c.name
        ])
        ));
}

// source stream -> process event -> state stream
function main(sources) {
  return {
    DOM: sources.HTTP
      .join()
      .map(resp => resp.body)
      .startWith(EMPTY_DIR_LIST)
      .map(dirlist => render(dirlist)),
    HTTP: sources.DOM
      .select('.directory')
      .events('mousedown')
      .map(ev => ev.target.getAttribute('href'))
      .startWith(window.VywConfig.prefix)
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#entrypoint'),
  HTTP: makeHTTPDriver()
});

