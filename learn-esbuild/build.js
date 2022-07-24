// js api调用 打包输出成一个文件
const esbuild = require('esbuild');
const path = require('path');

const result = esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, 'test.ts')],
  outdir: path.resolve(__dirname, 'dist'),
});

console.log(result); // { errors: [], warnings: [] }
