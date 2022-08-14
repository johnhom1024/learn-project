// -------------- 以下是测试Proxy对对象的监听

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

const obj = {
  a: {
    name: 'johnhom'
  },
}

const proxyObj = new Proxy(obj, handler)


// 这里监听到了读取 a
proxyObj.a.name = 'meimei'

// 这里监听到了读取 a
console.log(proxyObj.a.name);

