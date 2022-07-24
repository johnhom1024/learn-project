// 使用匿名函数的作用就是函数作为一个块级作用于，内部的变量不会污染到全局
(function() {
  const app = document.querySelector('#app');

  const div = document.createElement('div');
  div.innerHTML = '<div>Hello World</div>';
  app?.appendChild(div);
})()