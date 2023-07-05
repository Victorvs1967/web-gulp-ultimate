import gulp from 'gulp';

import fonts, { fontsStyle } from './tasks/fonts.js';
import html from './tasks/html.js';
import pug from './tasks/pug.js';
import sass from './tasks/sass.js';
import scripts from './tasks/scripts.js';
import images from './tasks/images.js';
import svgSprite from './tasks/svgsprite.js';
import server from './tasks/server.js';
import watcher from './tasks/watcher.js';
import clean from './tasks/clean.js'
import app from './config/gulp.js';

const { series, parallel } = gulp;
const { isDev, isPug } = app;

const build = series(
  clean,
  series(fonts, fontsStyle),
  parallel(svgSprite, images, scripts, sass, isPug ? pug : html),
);

const dev = series(
  build,
  parallel(server, watcher),
);

export default isDev ? dev : build;