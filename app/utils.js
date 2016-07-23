
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


const imgType = ['bmp', 'jpg', 'jpeg', 'gif', 'png', 'webp'];

export
function fileType(c) {
  if (c.type === 'directory') {
    return c.type;
  }
  if (imgType.includes(ext(c.name))) {
    return 'image';
  }
  return c.type;
}

function ext(name = '') {
  return name.substring(name.lastIndexOf('.') + 1);
}
