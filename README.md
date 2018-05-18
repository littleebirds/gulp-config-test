### gulp构建项目
- 前三个demo是在网上找的项目让敲了一边熟悉了一下
    1. gulpdemo1 这个项目源自 [使用gulp自动构建项目](https://segmentfault.com/a/1190000011514257)
    2. gulpdemo2 这个项目源自 [使用gulp构建一个项目](https://blog.csdn.net/zchcode/article/details/51556699)
    3. gulpdemo3 这个项目源自 [基于 gulp 的前端自动化构建方案总结
](https://www.jianshu.com/p/3e0c16b2e7ef)
    4. 在这里对上面三个项目的作者表示由衷的感谢！
- gulpdemo4是根据前三个项目总结出来，适合我目前需求构建的项目
- 所有demo用到的模块
    1. gulp ---核心模块，构建项目的核心
    2. gulp-concat ---将多个文件合并为一个
    3. gulp-minify-css ---压缩css
    4. gulp-uglify ---压缩JS
    5. gulp-sourcemaps ---生成source map。简单说，source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
    6. browser-sync ---创建服务页面，个人感觉像webpack里的webpack-dev-server
    7. opn ---跨平台 ） 打开文件，网站，可执行文件等
    8. gulp-util ---控制台着色
    9. stream-combiner2 ---有些 gulp 任务编译出错会终止 gulp.watch，使用 gulp-watch-path 配合stream-combiner2 可避免这种情况
    10. gulp-watch-path ---文件很多时编辑那个哪个压缩，不会全部压缩（获取改变的文件的src和dest路径）
    11. gulp-imagemin ---压缩图片
    12. gulp-less ---编译less文件
    13. gulp-clean-css ---压缩css
    14. gulp-rename ---重命名文件
    15. gulp-plumber ---避免因错误而中断 gulp
    16. gulp-cache ---基于临时文件的缓存代理任务
    17. gulp-sass ---编译sass
    18. imagemin-pngquant ---压缩png图片
    19. gulp.spritesmith   ---Convert a set of images into a spritesheet and CSS variables via gulp
    20. gulp-autoprefixer ---为 css 属性添加浏览器前缀，同时也会自动删除一些不必要的浏览器前缀
### 涉及到某个模块的具体细节，建议查看对应模块的文档
### 有特殊需求的建议查看官方的 [使用技巧](https://www.gulpjs.com.cn/docs/recipes/)
