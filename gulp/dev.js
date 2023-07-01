import gulp from "gulp";
import fileInclude from 'gulp-file-include';
import * as Sass from 'sass';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
// import babel from 'gulp-babel';
import webpack from 'webpack-stream';
// import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { deleteAsync } from 'del';
import rename from 'gulp-rename';
import server from 'gulp-server-livereload';

import config from '../webpack.config.js';

const { task, series, src, dest, watch } = gulp;

const sass = gulpSass(Sass);

const fileInludeOptions = {
  prefix: '@@',
  basepath: '@file',
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

task('html:dev', () =>
  src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(changed('./build/', { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileInludeOptions))
    .pipe(dest('./build/'))
);

task('sass:dev', () =>
  src('./src/sass/*.sass', { sourcemaps: true })
    .pipe(changed('./build/css/'))
    .pipe(plumber(plumberNotify('SASS')))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(rename('main.min.css'))
    .pipe(dest('./build/css/', { sourcemaps: true }))
);

task('js:dev', () =>
  src('./src/js/*.js', { sourcemaps: true })
    .pipe(changed('./build/js/'))
    .pipe(plumber(plumberNotify('JS')))
    // .pipe(babel())
    .pipe(webpack(config))
    .pipe(dest('./build/js/', { sourcemaps: true }))
);

task('images:dev', () =>
  src('./src/img/**/*')
    .pipe(changed('./build/img/'))
    // .pipe(imagemin({ verbose: true }))
    .pipe(dest('./build/img/'))
);

task('fonts:dev', () =>
  src('./src/fonts/**/*.ttf')
    .pipe(changed('./build/fonts/'))
    .pipe(dest('./build/fonts/'))
);

task('files:dev', () =>
  src('./src/files/**/*')
    .pipe(changed('./build/files/'))
    .pipe(dest('./build/files/'))
);

task('server:dev', () =>
  src('./build')
    .pipe(server(serverOptions))
);

task('clean:dev', async () => await deleteAsync('./build/', { force: true }));

task('watch:dev', () => {
  watch('./src/js/**/*.js', series('js:dev'));
  watch('./src/sass/**/*.sass', series('sass:dev'));
  watch('./src/html/**/*.html', series('html:dev'));
  watch('./src/fonts/**/*', series('fonts:dev'));
  watch('./src/img/**/*', series('images:dev'));
  watch('./src/files/**/*', series('files:dev'));
});
