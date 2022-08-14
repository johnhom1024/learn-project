// -------------- 以下是测试Proxy对数组的监听

const handler = {
  get(target, key, receiver) {
    console.log('这里监听到了读取', key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log('这里监听到了写入', value);
    Reflect.set(target, key, value, receiver);
    return true;
  },
};

const array = [
  {
    name: 'junhong',
  },
  {
    name: 'haha',
  },
]

const reactiveArray = new Proxy(array, handler);

reactiveArray[0] = { name: '测试' };
// 这里监听到了写入 { name: '测试' }

reactiveArray[0].name = 'dd';
// 这里监听到了读取 0

reactiveArray.push({ name: 'meimei' });
// 这里监听到了读取 push
// 这里监听到了读取 length
// 这里监听到了写入 { name: 'meimei' }
// 这里监听到了写入 3


reactiveArray[2] = { name: 'ok' }
// 这里监听到了写入 3
// 这里监听到了写入 { name: 'ok' }

reactiveArray[2].age = 55
// 这里监听到了读取 2

console.log(reactiveArray);

// ------ 以上结论 ---------

/**
 * Proxy的api并不能拦截到对象数组类型里面的对象属性的读取和修改
 * Proxy只能拦截针对这个数组的一些列属性的操作，包括push等
 */
