require! gulp

gulp.task \default,
    * \eslint
    * \test

gulp.task \eslint ->

gulp.task \test ->

gulp.task \build ->
    gulp.src 'app/app.js'
        .pipe webpack(require './webpack.config.js')
        .pipe gulp.dest \dist

gulp.task \devserver ->


