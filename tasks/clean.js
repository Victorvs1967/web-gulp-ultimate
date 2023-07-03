import { deleteAsync } from 'del';

import path from '../config/path.js';

const clean = async () => deleteAsync(path.root.concat('/index.html'), path.sass.dest, path.js.dest);

export default clean;