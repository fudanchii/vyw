import Cycle from '@cycle/most-run';
import {makeDOMDriver} from '@motorcycle/dom';
import {makeHTTPDriver} from '@motorcycle/http';
import {fromEvent} from 'most';

import {join, hashToURL} from './utils';

import {render} from './view';

const EMPTY_DIR_LIST = [{}];

function clickStream(sources, selector) {
  return sources.DOM
    .select(selector)
    .events('click')
    .map(ev => hashToURL(ev.target.getAttribute('href')));
}

function directoryClickStream(sources) {
  return clickStream(sources, '.tiles__directory-link');
}

function fileClickStream(sources) {
  return clickStream(sources, '.tiles__file-link');
}

function historyChangeStream() {
  return fromEvent('popstate', window)
    .map(ev => hashToURL(window.location.hash));
}

function httpResponseStream(sources) {
  return sources.HTTP
    .join()
    .map(resp => resp.body);
}

// source stream -> process event -> state stream
function main(sources) {
  return {
    DOM: httpResponseStream(sources)
      .startWith(EMPTY_DIR_LIST)
      .map(dirlist => render(dirlist)),
    HTTP: directoryClickStream(sources)
      .merge(historyChangeStream())
      .startWith(hashToURL(window.location.hash))
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#entrypoint'),
  HTTP: makeHTTPDriver()
});

