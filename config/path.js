const src = './src',
      dest = process.argv.includes('--prod') ? './docs' : './dist';

const path = {
  root: dest,
  src: src,
  html: {
    src: [src.concat('/html/*.html'), src.concat('/html/pages/*.html'), '!'.concat(src, '/html/includes/*.html')],
    pages: src.concat('/html/pages/*.html'),
    watch: src.concat('/html/**/*.html'),
    dest: dest,
  },
  pug: {
    src: [src.concat('/pug/*.pug'), src.concat('/pug/pages/*.pug')],
    pages: src.concat('/pug/pages/*.pug'),
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
    watch: src.concat('/js/**/*'),
    dest: dest.concat('/js/'),
  },
  img: {
    src: src.concat('/img/**/*.{png,jpg,jpeg,gif,svg}'),
    icons: src.concat('/icons/**/*.svg'),
    watch: src.concat('/img/**/*.{png,jpg,jpeg,gif,svg}'),
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
    watch: src.concat('/lib/**/*.{css,js}'),
    destCss: dest.concat('/css/'),
    destJs: dest.concat('/js/'),
  },
};

export default path;