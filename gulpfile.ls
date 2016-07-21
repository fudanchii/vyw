require! gulp

gulp.task \default [\eslint \test]

gulp.task \eslint ->

gulp.task \test ->

gulp.task \build [\css \webpack]

gulp.task \css ->
    require! 'gulp-postcss' : postcss

    gulp.src 'app/styles/main.css'
        .pipe postcss [ require(\precss)
                        require(\cssnano) ]
        .pipe gulp.dest('dist')

gulp.task \webpack ->
    require! 'livescript'
    require! 'webpack-stream' : webpack

    gulp.src 'app/app.js'
        .pipe webpack(require './webpack.config.ls')
        .pipe gulp.dest('dist')

gulp.task \devserver ->
