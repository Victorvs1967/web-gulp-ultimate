import gulp from 'gulp';
import font, { fontsStyle } from './tasks/fonts.js';
import './gulp/dev.js';
import './gulp/docs.js';

const { task, series, parallel } = gulp;

task('default', series(
  'clean:dev',
  parallel('files:dev', 'images:dev', 'fonts:dev', 'js:dev', 'sass:dev', 'html:dev'),
  parallel('server:dev', 'watch:dev'),
));

task('docs', series(
  'clean',
  font,
  fontsStyle,
  parallel('files', 'images', 'js', 'sass', 'html'),
  // parallel('files', 'images', 'fonts', 'js', 'sass', 'html'),
  parallel('server'),
));
