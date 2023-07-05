import * as Sass from 'sass';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import autoPrefixer from 'gulp-autoprefixer';
import replace from 'gulp-replace';
import csso from 'gulp-csso';
import webpCss from 'gulp-webp-css';
import rename from 'gulp-rename';

import app from '../config/gulp.js';

const { src, dest, path, gulpif, isDev, isProd, changed, plumber, plumberNotify, sassOptions } = app;
const _sass = gulpSass(Sass);

const sass = () => src(path.sass.src, { sourcemaps: isDev })
  .pipe(changed(path.sass.dest))
  .pipe(plumber(plumberNotify('SASS')))
  .pipe(sassGlob())
  .pipe(_sass(sassOptions))
  .pipe(autoPrefixer())
  .pipe(replace(/@img\//g, '../img/'))
  .pipe(gulpif(isProd, csso()))
  .pipe(webpCss())
  .pipe(rename('main.min.css'))
  .pipe(dest(path.sass.dest, { sourcemaps: isDev }));

export default sass;