import Cycle from '@cycle/most-run';
import {makeDOMDriver} from '@motorcycle/dom';
import {makeHTTPDriver} from '@motorcycle/http';
import {makeHistoryDriver} from './drivers/history';

import {join, backURL} from './utils';

import {render} from './view';

const EMPTY_DIR_LIST = [{}];

function listingClickStream(sources) {
  return sources.DOM
    .select('.tiles__directory-link,.tiles__file-link')
    .events('click')
    .map(ev => backURL(ev.target.getAttribute('href')));
}

function historyChangeStream(sources) {
  return sources.History.map(data => backURL(data.state || '#/'));
}

// source stream -> process event -> state stream
function main(sources) {
  return {
    DOM: sources.HTTP
      .join()
      .map(resp => resp.body)
      .startWith(EMPTY_DIR_LIST)
      .map(dirlist => render(dirlist)),
    HTTP: listingClickStream(sources)
      .merge(historyChangeStream(sources))
      .startWith(backURL(window.location.hash || '#/'))
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#entrypoint'),
  HTTP: makeHTTPDriver(),
  History: makeHistoryDriver()
});

