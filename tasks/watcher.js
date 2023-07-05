import html from './html.js';
import scripts from './scripts.js';
import sass from './sass.js';
import fonts from './fonts.js';
import images from './images.js';
import svgsprite from './svgsprite.js';
import app from '../config/gulp.js';
import pug from './pug.js';

const { watch, path, isPug } = app;

const watcher = () => {
  watch(path.js.watch, scripts);
  watch(path.sass.watch, sass);
  isPug ? watch(path.pug.watch, pug) : watch(path.html.watch, html);
  watch(path.fonts.watch, fonts);
  watch(path.img.watch, images);
  watch(path.img.watch, svgsprite);
};

export default watcher;