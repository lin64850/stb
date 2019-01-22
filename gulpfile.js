var gulp = require('gulp')
var rename = require('gulp-rename')
var replace = require('gulp-replace')
var gulpSequence = require('gulp-sequence');

const jsonAlias = require("./src/platform/platform.alias.config.json");
const jsonPlatform = require("./src/platform/platform.config.json");
const alias = jsonAlias[jsonPlatform.platform];

gulp.task('init-file', gulpSequence('init-file-default', 'init-file-platform'));

gulp.task('init-file-default', function () {
  return gulp.src(['./src/package/**/*', '!./src/package/images/**/*']).pipe(gulp.dest('./dist'));
});

// 平台资源配置
const name = alias["@"];
gulp.task('init-file-platform', function () {
  if (name) {
    return gulp.src([`./src/platform/${name}/package/**/*`, `!./src/platform/${name}/package/images/**/*`]).pipe(gulp.dest('./dist'))
  } else {
    return function () { };
  }
});

gulp.task('page', taskCreatePage('clean'));
gulp.task('page:clean', taskCreatePage('clean'));
gulp.task('page:complete', taskCreatePage('complete'));
gulp.task('com', taskCreateComponent('clean'));
gulp.task('com:clean', taskCreateComponent('clean'));
gulp.task('com:complete', taskCreateComponent('complete'));

function taskCreatePage(name) {
  return () => {
    var fileName = process.argv[3];

    if (0 !== fileName.indexOf('--')) {
      return new Error('错误：请输入页面名称 -pageName')
    } else {
      fileName = fileName.substr(2, fileName.length)

      // 自动配置 不够智能
      // gulp.src('./webpack.pages.config.ts')
      //   .pipe(replace('\n]', ', \n    "' + fileName + '"\n]'))
      //   .pipe(gulp.dest('./'))

      return gulp.src('./src/template/' + name + '/**/*')
        // .pipe(rename({basename: fileName}))
        .pipe(replace('index', fileName))
        .pipe(gulp.dest('./src/pages/' + fileName))
    }
  }
}
function taskCreateComponent(name) {
  return () => {
    var fileName = process.argv[3]

    if (0 !== fileName.indexOf('--')) {
      return new Error('错误：请输入页面名称 -componentName')
    } else {
      fileName = fileName.substr(2, fileName.length)

      var suf = fileName.split('/');

      return gulp.src('./src/template/com_' + name + '.tsx')
        .pipe(rename({ basename: 'com_' + suf[1] }))
        .pipe(replace('Index', suf[1].substr(0, 1).toUpperCase() + suf[1].substr(1, suf[1].length - 1)))
        .pipe(gulp.dest('./src/pages/' + suf[0]))
    }
  }
}