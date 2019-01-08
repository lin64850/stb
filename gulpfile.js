var gulp = require('gulp')
var rename = require('gulp-rename')
var replace = require('gulp-replace')
var gulpWatch = require('gulp-watch')

// TODO 兼容模式
// gulp.task('init-file', function () {
//   return gulp.src(['./src/package/**/*'])
//     .pipe(gulp.dest('./dist'))
// })
gulp.task('init-file', function () {
  return gulp.src(['./src/package/**/*', '!./src/package/images/**/*'])
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch-file', () => {
  return gulpWatch('./src/package/**/*', () => {
    gulp.src('./src/package/**/*')
      .pipe(gulp.dest('./dist'))
  })
})

gulp.task('page', () => {
  var fileName = process.argv[3]

  if (0 !== fileName.indexOf('--')) {
    return new Error('错误：请输入页面名称 -pageName')
  } else {
    fileName = fileName.substr(2, fileName.length)

    return gulp.src('./src/template/clean/**/*')
      // .pipe(rename({basename: fileName}))
      .pipe(replace('index', fileName))
      .pipe(gulp.dest('./src/pages/' + fileName))
  }
})
gulp.task('page:clean', () => {
  var fileName = process.argv[3]

  if (0 !== fileName.indexOf('--')) {
    return new Error('错误：请输入页面名称 -pageName')
  } else {
    fileName = fileName.substr(2, fileName.length)

    gulp.src('./webpack.pages.config.ts')
      .pipe(replace('\n]', ', \n    "' + fileName + '"\n]'))
      .pipe(gulp.dest('./'))

    return gulp.src('./src/template/clean/**/*')
      // .pipe(rename({basename: fileName}))
      .pipe(replace('index', fileName))
      .pipe(gulp.dest('./src/pages/' + fileName))
  }
})
gulp.task('page:complete', () => {
  var fileName = process.argv[3]

  if (0 !== fileName.indexOf('--')) {
    return new Error('错误：请输入页面名称 -pageName')
  } else {
    fileName = fileName.substr(2, fileName.length)

    gulp.src('./webpack.pages.config.ts')
      .pipe(replace('\n]', ', \n    "' + fileName + '"\n]'))
      .pipe(gulp.dest('./'))
      
    return gulp.src('./src/template/complete/**/*')
      // .pipe(rename({basename: fileName}))
      .pipe(replace('index', fileName))
      .pipe(gulp.dest('./src/pages/' + fileName))
  }
})
gulp.task('com:clean', () => {
  var fileName = process.argv[3]

  if (0 !== fileName.indexOf('--')) {
    return new Error('错误：请输入页面名称 -componentName')
  } else {
    fileName = fileName.substr(2, fileName.length)

    var suf = fileName.split('/');

    return gulp.src('./src/template/com_clean.tsx')
      .pipe(rename({ basename: 'com_' + suf[1] }))
      .pipe(replace('Index', suf[1].substr(0, 1).toUpperCase() + suf[1].substr(1, suf[1].length - 1)))
      .pipe(gulp.dest('./src/pages/' + suf[0]))
  }
})