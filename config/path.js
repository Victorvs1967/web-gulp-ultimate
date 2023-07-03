const src = './src',
      dest = './docs';

const path = {
  root: dest,
  src: src,
  html: {
    src: [src.concat('/html/**/*.html'), '!'.concat(src, '/html/includes/*.html')],
    watch: src.concat('/html/**/*.html'),
    dest: dest,
  },
  pug: {
    src: src.concat('/pug/*.pug'),
    watch: src.concat('/pug/**/*.pug'),
    dest: dest,
  },
  sass: {
    src: src.concat('/sass/*.sass'),
    lib: src.concat('/lib/**/*.css'),
    watch: src.concat('/sass/**/*.sass'),
    dest: dest.concat('/css/'),
  },
  js: {
    src: src.concat('/js/*.js'),
    js: src.concat('/lib/**/*.js'),
    watch: src.concat('/js/**/*.pug'),
    dest: dest.concat('/js/'),
  },
  img: {
    src: src.concat('/img/**/*.{png, jpg, jpeg, gif, svg}'),
    icons: src.concat('/icons/**/*.svg'),
    watch: src.concat('/img/**/*.{png, jpg, jpeg, gif, svg}'),
    dest: dest.concat('/img/'),
  },
  fonts: {
    src: src.concat('/fonts/**/*.{ttf,otf,eot,otc,woff,woff2,svg}'),
    watch: src.concat('/fonts/**/*.{ttf,otf,eot,otc,woff,woff2,svg}'),
    dest: dest.concat('/fonts/'),
  },
  lib: {
    srcCss: src.concat('/lib/**/*.{css}'),
    srcJs: src.concat('/lib/**/*.{js}'),
    watch: src.concat('/lib/**/*.{css, js}'),
    destCss: dest.concat('/css/'),
    destJs: dest.concat('/js/'),
  },
};

export default path;