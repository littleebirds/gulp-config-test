const gulp = require('gulp'); //gulp核心模块
const browserSync = require('browser-sync'); //动态刷新页面
const opn = require('opn'); //跨平台 ） 打开文件，网站，可执行文件等。
const path = {
    less: './less/*.less',
    js: './js/*.js',
    html: './dest/index.html',
    dest: './dest'
}
const concat = require('gulp-concat'); //将多个文件合并为一个
const gulpless = require('gulp-less'); //解析less 为css
const minifycss = require('gulp-minify-css'); //压缩css
gulp.task('less', function () {
    gulp.src(path.less)
        .pipe(gulpless())
        .pipe(minifycss())
        .pipe(concat('build.min.css'))
        .pipe(gulp.dest('./dest/css'))
        .pipe(browserSync.stream());
})

const annotate = require('gulp-ng-annotate'); //解决的就是angular中依赖注入的问题。在本项目中无用处
const uglify = require('gulp-uglify'); //压缩JS
const sourcemaps = require('gulp-sourcemaps'); //生成source map。简单说，source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
gulp.task('js', function () {
    gulp.src(path.js)
        .pipe(annotate({
            single_quotes: true
        }))
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dest/js'))
})


//启动任务
gulp.task('server', ['less', 'js'], function () {
    browserSync.init({
        server: {
            baseDir: path.dest
        },
        port: 8888,
        open: false
    }, function () {
        const homepage = 'localhost:8888';
        opn(homepage);
    })

    gulp.watch(path.less, ['less']);
    gulp.watch(path.js, ['js']);
    gulp.watch([path.html, path.js]).on("change", function () {
        browserSync.reload()
    })
    console.log('任务完成')
})