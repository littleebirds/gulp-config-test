const gulp = require('gulp'); //项目中的gulp
const uglify = require('gulp-uglify'); //压缩JS
const minifycss = require('gulp-minify-css'); //压缩css
const imgmin = require('gulp-imagemin'); //压缩图片
const gutil = require('gulp-util'); //控制台代码着色
const watchPath = require('gulp-watch-path'); //文件很多时编辑那个哪个压缩，不会全部压缩（获取改变的文件的src和dest路径）
const combiner = require('stream-combiner2'); //有些 gulp 任务编译出错会终止 gulp.watch，使用 gulp-watch-path 配合stream-combiner2 可避免这种情况

let handleError = function (error) {
    gutil.log('filename:' + gutil.colors.red(error.filename));
    gutil.log('lineNumber:' + gutil.colors.red(error.lineNumber));
    gutil.log('message:' + error.message);
    gutil.log('plugin:' + gutil.colors.yellow(error.plugin));
}

//新建JS批量压缩任务
gulp.task('script', function () {
    let srcJsPath = 'js/*.js';
    let destJsPath = 'dist/js/';
    let combined = combiner.obj([
        gulp.src(srcJsPath),
        uglify(),
        gulp.dest(destJsPath)
    ]);
    combined.on('error', handleError)
})
//新建css批量压缩任务
gulp.task('css', function () {
    let srcCssPath = 'css/*.css';
    let destCssPath = 'dist/css/';
    let combined = combiner.obj([
        gulp.src(srcCssPath),
        minifycss(),
        gulp.dest(destCssPath)
    ]);
    combined.on('error', handleError)
})
//新建图片批量压缩任务
gulp.task('images', function () {
    let srcImgPath = 'images/*.*';
    let destImgPath = 'dist/images/';
    let combined = combiner.obj([
        gulp.src(srcImgPath),
        imgmin(),
        gulp.dest(destImgPath)
    ]);
    combined.on('error', handleError)
})
gulp.task('watchJS', function () {
    gulp.watch('js/*.js', function (event) {
        let paths = watchPath(event, 'js/', 'dist/js/');
        //打印修改类型和路径
        gutil.log(gutil.colors.green(event.type) + '' + paths.srcPath);
        gutil.log('Dist:' + paths.distPath);
        //获取错误信息，继续执行代码
        let combined = combiner.obj([
            gulp.src(paths.srcPath),
            uglify(),
            gulp.dest(path.distDir)
        ]);
        combined.on('error', handleError)
    })
})

gulp.task('default', function () {
    gulp.run('watchJS', 'css', 'images');
    gulp.watch('js/*.js', ['watchJS']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('image/*.*', ['images']);
})