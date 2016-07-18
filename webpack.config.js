var getConfig = require('hjs-webpack'),
    fs = require('fs'),
    config;

function readFragment(name) {
  var fragmentName = 'app/fragments/' + name + '.html';
  try {
    fs.accessSync(fragmentName);
    return fs.readFileSync(fragmentName).toString();
  } catch(e) {
    return '';
  }
}

config = getConfig({
  in: 'app/app.js',
  out: 'dist',
  clearBeforeBuild: true,
  scripts: {
    build: 'webpack'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }]
  },
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        title: 'Vyw',
        html: readFragment('body'),
        head: readFragment('head')
      })
    };
  },
  hostname: '0.0.0.0'
});

module.exports = config;
