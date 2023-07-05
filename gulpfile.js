import gulp from 'gulp';

import font, { fontsStyle } from './tasks/fonts.js';
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

const { task, series, parallel } = gulp;
const { isPug } = app;

task('default', series(
  clean,
  series(font, fontsStyle),
  parallel(svgSprite, images, scripts, sass, isPug ? pug : html),
  parallel(server, watcher),
));
