const esbuild = require('esbuild');
const path = require('path');

// 测试插件
const testPlugin = {
  name: 'testPlugin',
  setup({ onStart, onResolve, onLoad, onEnd }) {
    onStart(() => {
      console.log('onStart');
    });
    onResolve({ filter: /.*/ }, (msg) => {
      console.log('onResolve', msg);
    });
    onLoad({ filter: /.*/ }, (msg) => {
      console.log('onLoad', msg);
    });
    onEnd((msg) => {
      console.log('onEnd', msg);
    });
  },
};

// 如果使用插件，这里不能使用buildSync
esbuild.build({
  entryPoints: [path.resolve(__dirname, 'test.ts')],
  outdir: path.resolve(__dirname, 'dist'),
  bundle: true,
  plugins: [testPlugin],
});
