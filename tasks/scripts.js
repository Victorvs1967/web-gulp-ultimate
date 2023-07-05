import webpack from 'webpack-stream';
import babel from 'gulp-babel';

import app from '../config/gulp.js';

const { src, dest, path, changed, replace, plumber, plumberNotify, webpackOptions } = app;

const scripts = () => src(path.js.src)
  .pipe(changed(path.js.dest))
  .pipe(plumber(plumberNotify('JS')))
  .pipe(babel())
  .pipe(replace(/@img\//g, '../img/'))
  .pipe(webpack(webpackOptions))
  .pipe(dest(path.js.dest));

export default scripts;