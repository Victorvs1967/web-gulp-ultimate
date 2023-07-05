import sprite from 'gulp-svg-sprite';

import app from '../config/gulp.js';

const { src, dest, path, plumber, plumberNotify, svg } = app;

const svgSprite = () => src(path.img.icons)
  .pipe(plumber(plumberNotify))
  .pipe(sprite(svg))
  .pipe(dest(path.img.dest));

export default svgSprite;