var gulp = require('gulp');
// 压缩 css 文件
var minifyCss = require('gulp-minify-css');
// 合并文件，类似母板页
var contentIncluder = require('gulp-content-includer');
// 压缩 html 文件
var htmlmin = require('gulp-htmlmin');
// 图片压缩
var imagemin = require('gulp-imagemin');
// png 压缩
var pngquant = require('imagemin-pngquant');
// 缓存，避免全部压缩，只压缩有改动过的文件
var cache = require('gulp-cache');

// css 压缩
gulp.task('css', function() {
  gulp.src('./assets/css/*.css')
    .pipe(cache(minifyCss()))
    .pipe(gulp.dest('./dist/assets/css/'))
});

// HTML处理
gulp.task('html', function() {
  gulp.src('./html/**/*.html')
    // 实现 include
    .pipe(contentIncluder({
      includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
    }))
    // 压缩 html
    .pipe(cache(htmlmin({
      //清除HTML注释
      removeComments: true,
      //压缩HTML
      collapseWhitespace: true
    })))
    // 移动位置
    .pipe(gulp.dest('./dist/html'));
});

// 图片压缩处理
gulp.task('images', function() {
  gulp.src('./assets/images/*.+(jpeg|jpg|png)')
    .pipe(cache(imagemin({
      progressive: true,
      use: [pngquant({
        quality: '70'
      })]
    })))
    .pipe(gulp.dest('./dist/assets/images/'));
});

// 数据复制
gulp.task('data', function() {
  gulp.src('./data/**/*.json')
    .pipe(gulp.dest('./dist/data/'));
  gulp.src('./wx/**/*.json')
    .pipe(gulp.dest('./dist/wx/'));
});

//定义默认任务
gulp.task('default', ['css', 'html', 'images', 'data']);

// 监控任务
gulp.task('watch', function() {
  gulp.watch('./html/**/*.html', ['html']);
  gulp.watch('./modules/*.html', ['html']);
  gulp.watch('./assets/css/*.css', ['css']);
  gulp.watch('./assets/images/*.*', ['images']);
  gulp.watch('./data/**/*.json', ['data']);
  gulp.watch('./wx/**/*.json', ['data']);
});

// gulp.task('js', function() {
//   return gulp.src('./dist/**/*.js')
//     .pipe(uglify()) //压缩
//     .pipe(gulp.dest('./distjs')); //输出
// });
