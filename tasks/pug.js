import _pug from 'gulp-pug';
import webpHtml from 'gulp-webp-html';
import htmlClean from 'gulp-htmlclean';

import app from '../config/gulp.js';
import replace from 'gulp-replace';

const { src, dest, gulpif, isProd, path, plumber, plumberNotify, pugOptions } = app;

const pug = () => src(path.pug.src)
  .pipe(plumber(plumberNotify('PUG')))
  .pipe(_pug(pugOptions))
  .pipe(replace(/@img\//g, './img/'))
  .pipe(webpHtml())
  .pipe(gulpif(isProd, htmlClean()))
  .pipe(dest(path.pug.dest));

export default pug;