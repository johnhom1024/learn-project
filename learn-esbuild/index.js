// js api调用 将ts文件的内容转成js并且输出
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'test.ts');
const tsFileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
const code = esbuild.transformSync(tsFileContent, {
  loader: 'ts',
});
console.log(code);
// 输出
// {
//  code: 'const str = 'Hello World'',
//  map: '',
//  warnings: []
// }
