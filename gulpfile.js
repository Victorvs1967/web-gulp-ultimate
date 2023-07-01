import gulp from 'gulp';
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
  parallel('files', 'images', 'fonts', 'js', 'sass', 'html'),
  parallel('server'),
));
