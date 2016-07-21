require! 'hjs-webpack' : getConfig
require! fs

read-fragment = (name) ->
    fragment-name = "app/fragments/#name.html"
    try
        fs.accessSync fragment-name
        fs.readFileSync fragment-name .toString!
    catch
        ''

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
            head: read-fragment \head
            publicPath: ''
    hostname: \0.0.0.0

module.exports = config
