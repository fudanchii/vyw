
export
function join(/*arguments*/) {
  let joindPath = Array.prototype.reduce.call(arguments, (p, c, i, a) => {
    return p + '/' + c;
  }, '');
  return joindPath.replace(/\/{2,}/g, '/').trim();
}

export
function hashToURL(hash) {
  const prefix = window.VywConfig.prefix;
  return join(prefix, hash.substr(1));
}

