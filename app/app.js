import Cycle from '@cycle/most-run';
import {makeDOMDriver} from '@motorcycle/dom';
import {makeHTTPDriver} from '@motorcycle/http';
import {fromEvent} from 'most';

import {join, hashToURL} from './utils';
import {render} from './view';

const EMPTY_DIR_LIST = [{}];

function historyChangeStream() {
  return fromEvent('popstate', window)
    .map(ev => hashToURL(window.location.hash));
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
      .startWith(hashToURL(window.location.hash))
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#entrypoint'),
  HTTP: makeHTTPDriver()
});

