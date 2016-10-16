require! 'hjs-webpack' : getConfig
require! fs

pkg = fs.read-file-sync('package.json', 'utf8') |> JSON.parse

read-fragment = (name) ->
    fragment-name = "app/fragments/#name.html"
    try
        fs.access-sync fragment-name
        fs.read-file-sync fragment-name .toString!
    catch
        ''

pkgname = pkg.name
pkgver = pkg.version
config = getConfig do
    in: 'app/app.js'
    out: \dist
    clearBeforeBuild: true
    scripts:
        build: \webpack
    module:
        loaders:
          * test: /\.js$/,
            exclude: /(node_modules|bower_components)/
            loader: \babel-loader
            query:
                presets: [\es2015]
                plugins: [\transform-runtime]
    html: (context) ->
        'index.html': context.defaultTemplate do
            lang: \en
            title: \Vyw
            html: read-fragment \body
            head: read-fragment \head .replace 'main.css', "#pkgname.#pkgver.css"
            publicPath: ''
    hostname: \0.0.0.0

module.exports = config
