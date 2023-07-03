import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import path from '../config/path.js';

const {src, dest} = gulp;
const isProd = process.argv.includes('--prod'),
      isDev = !isProd;

const app = {
  // COMMON
  src,
  dest,
  path,
  plumber,
  notify,
  newer,
  isProd,
  isDev,
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
  pug: {
    doctype: 'html',
    pretty: isDev,
    date: {},
  },
  // SASS
  sass: {
    outputStyle: isProd ? 'copressed' : 'expanded',
  },
  // RENAME
  rename: {
    basename: 'main',
    suffix: '.min',
  },
  // WEBPACK
  webpack: {
    mode: 'production',
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
  imagemin: {
    verbose: true
  },
  // FONTER
  fonter: {
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
};

export default app;