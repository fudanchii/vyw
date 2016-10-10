import Cycle from '@cycle/most-run';
import {makeDOMDriver} from '@motorcycle/dom';
import {makeHTTPDriver} from '@motorcycle/http';
import {fromEvent} from 'most';

import {hashToURL} from './utils';
import {render} from './view';
import {makeTitleDriver, title} from './drivers/title';

const EMPTY_DIR_LIST = [{}];

function historyChangeStream() {
  return fromEvent('popstate', window)
    .map(() => hashToURL(window.location.hash));
}

function httpResponseStream(sources) {
  return sources.HTTP
    .join()
    .filter(resp => resp.type === 'application/json')
    .map(resp => resp.body);
}

function main(sources) {
  return {
    DOM: httpResponseStream(sources)
      .startWith(EMPTY_DIR_LIST)
      .map(dirlist => render(dirlist)),

    HTTP: historyChangeStream()
      .startWith(hashToURL(window.location.hash)),

    Title: httpResponseStream(sources)
      .map(() => title(window.location.hash, 'Vyw'))
  };
}

const drivers = {
  DOM: makeDOMDriver('#entrypoint'),
  HTTP: makeHTTPDriver(),
  Title: makeTitleDriver()
};

Cycle.run(main, drivers);

