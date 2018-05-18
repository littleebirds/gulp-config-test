const gulp = require('gulp');

const less = require('gulp-less');
const cleanCss = require('gulp-clean-css'); // 压缩（minify） css 文件（这里只是压缩，但后面还需要用别的插件来重命名为 xxx.min.css 的形式）
const autoprefixer = require('gulp-autoprefixer'); //为 css 属性添加浏览器前缀，同时也会自动删除一些不必要的浏览器前缀

const uglify = require('gulp-uglify'); //压缩（optimize）js 文件

const concat = require('gulp-concat'); //合并文件。我们可以用它来合并js或css文件等，这样就能减少页面的http请求数了
const rename = require('gulp-rename'); //重命名文件（咚门：用过之后，发现并不能很好地满足我最初的需求：“可以批量处理，自动在 原文件名 基础上插入一个‘.min’”。非常死板，无法批量处理，只能具体文件具体重命名）
const clean = require('gulp-clean'); //删除文件和文件夹
const sourcemaps = require('gulp-sourcemaps'); //生成映射
const plumber = require('gulp-plumber'); //避免因错误而中断 gulp

const imagemin = require('gulp-imagemin'); //图片压缩
const pngquant = require('imagemin-pngquant'); //png图片压缩插件
const spritesmith = require('gulp.spritesmith');
const cache = require('gulp-cache'); //基于临时文件的缓存代理任务

const browserSync = require('browser-sync');
const reload = browserSync.reload;

const path = {
    less: 'src/style/*.less'
}
gulp.task('less', function (cb) {
    return gulp.src(path.less)
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('src/style/tmp'))
        .pipe(concat('all-less.css'))
        .pipe(autoprefixer({
            browsers: ['>1%', 'not ie <=8']
        }))
        .pipe(gulp.dest('src/style'));
    console.log('less文件处理完毕');
    cb(err)
})

gulp.task('css', ['less'], function (cb) {
    return gulp.src('src/style/*.css')
        .pipe(concat('bundle.min.css'))
        .pipe(cleanCss())
        .pipe(gule.dest('dist/style'));
    console.log('css 文件处理完毕')
    cb(err)
})

gulp.task('css-watch', ['css'], function () {
    let watcher = gulp.watch('src/style/*.less', ['css']);
    watcher.on('change', function (event) {
        console.log('事件路径：' + event.path + '事件类型：' + event.type + ',正在执行的任务')
    })
})


//压缩JS
gulp.task('js-optimize', function (cb) {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js/tmp'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
})

gulp.task('js', ['js-optimize'], function () {
    return gulp.src('src/js/other/*.js')
        .pipe(gulp.dest('dist/js/others'));
    console.log('JS文件移动完成');
})

gulp.task('js-watch', ['js'], function () {
    console.log('正在监视JS文件移动')
    let watcher = gulp.watch('src/js/**/*.js', ['js']);
    watcher.on('change', function () {
        console.log('事件路径：' + event.path + '事件类型：' + event.type + ',正在执行的任务')
    })
})

gulp.task('img', function () {
    return gulp.src('src/media/*.{png,jpg,gif}')
        .pipe(plumber())
        .pipe(cache(imagemin({
            progressive: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/media'))
})

gulp.task('sprite', function () {
    return gulp.src('src/media/!(sprite.png|*.css)')
        .pipe(spritesmith({
            imgName: 'ico.png',
            cssName: 'sprite.css'
        }))
})

gulp.task('serve', function () {
    browserSync.init({
        // proxy: "deva.dev",
        server: {
            baseDir: './dist',
            index: "index.html"
        },
        port: 3001,
        open: false,
        ui: false
    });
});