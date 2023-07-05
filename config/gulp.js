import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import changed from 'gulp-changed';
import replace from 'gulp-replace';
import gulpif from 'gulp-if';

import path from '../config/path.js';

const {src, dest, watch} = gulp;
const isProd = process.argv.includes('--prod'),
      isDev = !isProd,
      isPug = process.argv.includes('--pug');

const app = {
  // COMMON
  src,
  dest,
  watch,
  path,
  gulpif,
  plumber,
  notify,
  changed,
  replace,
  newer,
  isProd,
  isDev,
  isPug,
  // NOTIFY
  plumberNotify: title => ({
    errorHandler: notify.onError({
      title,
      message: 'Error: <%= error.message %>',
      sound: false,
    })
  }),
  // INCLUDE
  fileInludeOptions: {
    prefix: '@@',
    basepath: '@file',
  },
  // PUG
  pugOptions: {
    doctype: 'html',
    pretty: !process.argv.includes('--prod'),
    date: {},
  },
  // SASS
  sassOptions: {
    outputStyle: process.argv.includes('--prod') ? 'compressed' : 'expanded',
  },
  // RENAME
  rename: {
    basename: 'main',
    suffix: '.min',
  },
  // WEBPACK
  webpackOptions: {
    mode: process.argv.includes('--prod') ? 'production' : 'development',
    entry: {
      main: './src/js/main.js',
      about: './src/js/about.js',
    },
    output: {
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
  // IMAGEMIN
  imageminOptions: {
    verbose: true
  },
  // FONTER
  fonterOptions: {
    formats: 'ttf'
  },
  // SVG
  svg: {
    mode: {
      stack: {
        sprite: '../icons/icons.svg',
        example: true,
      },
    },
  },
  // SERVER
  serverOptions: {
    livereload: true,
    open: true,
  },
};

export default app;