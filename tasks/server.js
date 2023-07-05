import liveServer from 'gulp-server-livereload';

import app from '../config/gulp.js';

const { src, path, serverOptions } = app;

const server = () => src(path.root)
  .pipe(liveServer(serverOptions));

export default server;
