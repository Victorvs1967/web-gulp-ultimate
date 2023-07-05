import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

import app from '../config/gulp.js';

const { src, dest, path, changed, plumber, plumberNotify, imageminOptions, isProd } = app;

const images = () => src([path.img.src, path.img.icons])
  .pipe(plumber(plumberNotify('IMAGE')))
  .pipe(changed(path.img.dest))
  .pipe(imagemin(imageminOptions))
  .pipe(dest(path.img.dest))
  .pipe(src(path.img.src))
  .pipe(changed(path.img.dest))
  .pipe(webp())
  .pipe(dest(path.img.dest));

export default images;