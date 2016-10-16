Vyw
---

Browse your files, view images thumbnail, only nginx needed.  

Vyw structured around reactive programming, using [cyclejs](http://cycle.js.org/) with [most](https://github.com/cujojs/most) as its underlying base.

**Prerequisite**:

- Nginx > 1.9

Optionally, you may want nginx with image_filter module compiled to generate thumbnail.

**Installation**

- Get the latest release, or build yourself.
- Check nginx config in `eg` folder, you can include that file to your main nginx config directly.
- Edit vyw.config.js file according to your setup.
- Restart nginx, open vyw index.html from your browser

**Development**

You will need recent nodejs and yarnpkg, the usual procedure for nodejs based project applied:
```
# cd to vyw source dir after clone
$ yarn

# Assuming gulp already installed globally
$ gulp build

# To automatically build files while developing
$ gulp watch
```

**Development Stack**

- [Nginx](http://nginx.org/)
- [Cyclejs](http://cycle.js.org/)
- [Most](https://github.com/cujojs/most)
- [Babel](https://babeljs.io/)
- [Livescript](http://livescript.net/)
- [Webpack](https://webpack.github.io/)


**Security Consideration**

Please be aware that Vyw doesn't employ any authorization nor implements any access restriction to the directory listing or files. Vyw were designed to be a simple files browser fully run on client (web browser). All access restriction should be implemented on the server. You may want, at least, to add [basic auth](http://nginx.org/en/docs/http/ngx_http_auth_basic_module.html) method to the directory listing on your nginx config, in addition of using https for everything.


ISC License (ISC)
---
Copyright (c) 2016, Nurahmadie <nurahmadie@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
