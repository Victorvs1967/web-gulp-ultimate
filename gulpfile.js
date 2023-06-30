import gulp from "gulp";
import fileInclude from 'gulp-file-include';
import * as Sass from 'sass';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
// import groupMediaQuieries from 'gulp-group-css-media-queries';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { deleteAsync } from 'del';
import server from 'gulp-server-livereload';

import config from './webpack.config.js';

const { task, series, parallel, src, dest, watch } = gulp;

const sass = gulpSass(Sass);

const fileInludeOptions = {
  prefix: '@@',
  basepath: '@file',
};

const sassOptions = {

};

const serverOptions = {
  livereload: true,
  open: true,
};

const plumberNotify = title => ({
  errorHandler: notify.onError({
    title,
    message: 'Error: <%= error.message %>',
    sound: false,
  })
});

task('html', () =>
  src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(changed('./dist/'))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileInludeOptions))
    .pipe(dest('./dist/'))
);

task('sass', () =>
  src('./src/sass/*.sass', { sourcemaps: true })
    .pipe(changed('./dist/css/'))
    .pipe(plumber(plumberNotify('SASS')))
    .pipe(sassGlob())
    .pipe(sass())
    // .pipe(groupMediaQuieries()) // break source mapping!!!
    .pipe(dest('./dist/css/', { sourcemaps: true }))
);

task('js', () =>
  src('./src/js/*.js', { sourcemaps: true })
    .pipe(changed('./dist/js/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(config))
    .pipe(dest('./dist/js/', { sourcemaps: true }))
);

task('images', () =>
  src('./src/img/**/*')
    .pipe(changed('./dist/img/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(dest('./dist/img/'))
);

task('fonts', () =>
  src('./src/fonts/**/*.ttf')
    .pipe(changed('./dist/fonts/'))
    .pipe(dest('./dist/fonts/'))
);

task('files', () =>
  src('./src/files/**/*')
    .pipe(changed('./dist/files/'))
    .pipe(dest('./dist/files/'))
);

task('server', () =>
  src('./dist')
    .pipe(server(serverOptions))
);

task('clean', async () => await deleteAsync('./dist/'));

task('watch', () => {
  watch('./src/js/**/*.js', series('js'));
  watch('./src/sass/**/*.sass', series('sass'));
  watch('./src/html/**/*.html', series('html'));
  watch('./src/fonts/**/*', series('fonts'));
  watch('./src/img/**/*', series('images'));
  watch('./src/files/**/*', series('files'));
});

task('default', series(
  'clean',
  parallel('files', 'images', 'fonts', 'js', 'sass', 'html'),
  parallel('server', 'watch'),
));