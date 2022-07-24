const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const HTML_PATH = path.resolve(__dirname, 'index.html');

const TARGET_PATH = path.resolve(__dirname, 'dist');

const OUTPUT_PATH = './test.js';

const testPlugin = {
  name: 'testPlugin',
  setup({ onEnd }) {
    // 打包结束后执行替换和复制html操作
    onEnd(({ errors }) => {
      console.log(errors);
      if (!errors.length) {
        let data = fs.readFileSync(HTML_PATH, { encoding: 'utf-8' });
        data = data.replace(`{{script}}`, OUTPUT_PATH);
        console.log(data);
        console.log(TARGET_PATH);
        fs.writeFileSync(path.resolve(TARGET_PATH, 'index.html'), data, {
          encoding: 'utf-8',
        });
      }
    });
  },
};


esbuild.build({ 
  entryPoints: [path.resolve(__dirname, 'test.ts')],
  outdir: path.resolve(__dirname, 'dist'),
  bundle: true,
  plugins: [testPlugin],
}).then((msg) => {
  if (msg.length) {
    throw new Error('compile error')
  }

  console.log('compile success');
})