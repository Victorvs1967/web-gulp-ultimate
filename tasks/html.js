import fileinclude from 'gulp-file-include';
import replace from 'gulp-replace';
import webpHtml from 'gulp-webp-html';
import htmlclean from 'gulp-htmlclean';

import app from '../config/gulp.js';

const { src, dest, gulpif, isProd, path, plumberNotify, fileInludeOptions } = app;

const html = () => src(path.html.src)
  .pipe(app.plumber(plumberNotify('HTML')))
  .pipe(fileinclude(fileInludeOptions))
  .pipe(replace(/@img\//g, './img/'))
  .pipe(webpHtml())
  .pipe(gulpif(isProd, htmlclean()))
  .pipe(dest(path.html.dest));

export default html;
