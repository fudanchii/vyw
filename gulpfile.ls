require! gulp
require! fs

pkg = fs.read-file-sync('package.json', 'utf8') |> JSON.parse

gulp.task \default [\eslint \test]

gulp.task \eslint ->

gulp.task \test ->

gulp.task \build [\css \webpack \config]

gulp.task \config ->
    require! 'gulp-livescript' : lsc

    gulp.src 'vyw.config.ls'
        .pipe lsc do
            bare: true
        .pipe gulp.dest('./dist')

gulp.task \css ->
    require! 'gulp-postcss' : postcss
    require! 'gulp-rename': rename

    pkgname = pkg.name
    pkgver = pkg.version

    gulp.src 'app/styles/main.css'
        .pipe postcss [ require(\precss)
                        require(\cssnano) ]
        .pipe rename("#pkgname.#pkgver.css")
        .pipe gulp.dest('dist')

gulp.task \webpack ->
    require! 'livescript'
    require! 'webpack-stream' : webpack

    gulp.src 'app/app.js'
        .pipe webpack(require './webpack.config.ls')
        .pipe gulp.dest('dist')

gulp.task \watch ->
    require! 'gulp-watch' : watch

    watch 'app/**/*' !-> gulp.start \build
