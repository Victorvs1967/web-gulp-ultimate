import gulp from "gulp";
import fileInclude from 'gulp-file-include';
import htmlclean from 'gulp-htmlclean';
import replace from 'gulp-replace';
import * as Sass from 'sass';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import webpHtml from 'gulp-webp-html';
import webpCss from 'gulp-webp-css';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import { deleteAsync } from 'del';
import server from 'gulp-server-livereload';

import config from '../webpack.config.js';

const { task, src, dest } = gulp;

const sass = gulpSass(Sass);

const fileInludeOptions = {
  prefix: '@@',
  basepath: '@file',
};

const sassOptions = {
  outputStyle: 'compressed',
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
  src(['./src/html/**/*.html', '!./src/html/includes/*.html'])
    .pipe(changed('./docs/'))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileInludeOptions))
    .pipe(replace(/@img\//g, './img/'))
    .pipe(webpHtml())
    .pipe(htmlclean())
    .pipe(dest('./docs/'))
);

task('sass', () =>
  src('./src/sass/*.sass')
    .pipe(changed('./docs/css/'))
    .pipe(plumber(plumberNotify('SASS')))
    .pipe(sassGlob())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(replace(/@img\//g, '../img/'))
    .pipe(csso())
    .pipe(webpCss())
    .pipe(rename('main.min.css'))
    .pipe(dest('./docs/css/'))
);

task('js', () =>
  src('./src/js/*.js')
    .pipe(changed('./docs/js/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(config))
    .pipe(dest('./docs/js/'))
);

task('images', () =>
  src('./src/img/**/*')
    .pipe(changed('./docs/img/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(dest('./docs/img/'))
    .pipe(src('./src/img/**/*'))
    .pipe(changed('./docs/img/'))
    .pipe(webp())
    .pipe(dest('./docs/img/'))
);

task('fonts', () =>
  src('./src/fonts/**/*.ttf')
    .pipe(changed('./docs/fonts/'))
    .pipe(dest('./docs/fonts/'))
);

task('files', () =>
  src('./src/files/**/*')
    .pipe(changed('./docs/files/'))
    .pipe(dest('./docs/files/'))
);

task('server', () =>
  src('./docs')
    .pipe(server(serverOptions))
);

task('clean', async () => await deleteAsync('./docs/', { force: true }));
