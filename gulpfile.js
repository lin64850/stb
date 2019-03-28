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

gulp.task('page', taskCreatePage('page_clean'));
gulp.task('page:clean', taskCreatePage('page_clean'));
gulp.task('page:complete', taskCreatePage('page_complete'));
gulp.task('page:home', taskCreatePage('page_home'));
gulp.task('page:list', taskCreatePage('page_list'));
gulp.task('page:record', taskCreatePage('page_record'));
gulp.task('page:details', taskCreatePage('page_details'));
gulp.task('page:play', taskCreatePage('page_play'));
gulp.task('page:special', taskCreatePage('page_special'));
gulp.task('page:search', taskCreatePage('page_search'));
gulp.task('com', taskCreateComponent('com_clean'));
gulp.task('com:clean', taskCreateComponent('com_clean'));
gulp.task('com:complete', taskCreateComponent('com_complete'));
gulp.task('platform:telecom', taskCreatePlatform('platform_telecom'));
gulp.task('platform:mobile', taskCreatePlatform('platform_mobile'));

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
        // .pipe(replace('index', fileName))
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

      return gulp.src('./src/template/' + name + '/**/*')
        .pipe(rename(function (path) {
          if ("-1" != path.basename.indexOf('com')) {
            path.basename = path.basename.replace('com', suf[1]);
          }
        }))
        .pipe(replace('Index', suf[1].substr(0, 1).toUpperCase() + suf[1].substr(1, suf[1].length - 1)))
        .pipe(replace('index', suf[1]))
        .pipe(gulp.dest('./src/pages/' + suf[0]))
    }
  }
}
function taskCreatePlatform(name) {
  return () => {
    var fileName = process.argv[3];

    if (0 !== fileName.indexOf('--')) {
      return new Error('错误：请输入平台名称 -platformName')
    } else {
      fileName = fileName.substr(2, fileName.length)

      return gulp.src('./src/template/' + name + '/**/*')
        .pipe(gulp.dest('./src/platform/' + fileName))
    }
  }
}