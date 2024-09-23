import { build } from 'esbuild';
import path from 'node:path';

const cwd = process.cwd();
const outfile = path.resolve(cwd, 'dist/index.js');
const tsconfig = path.resolve(cwd, 'tsconfig.json');

const entryPoints = [path.resolve(cwd, 'src/index.js')];
const config = {
  platform: 'node',
  target: ['node18', 'es2021'],
  format: 'cjs',
  bundle: true,
  keepNames: true,
  tsconfig,
  entryPoints,
  outfile,
  minify: false,
};

(async function () {
  await build(config);
})()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(-1)
  });


