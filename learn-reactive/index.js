const { track, trigger, effect } = require('./utils');

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      track(receiver, key); // 访问时收集依赖
      /**
       * 如果这里只写成 return Reflect.get(target, key) 
       * 那么后面有一个obj对象继承proxyPerson，那么里面的this指向就是proxyPerson而不是当前obj。Reflect.get(target, key, receiver)就可以解决这个问题。
       * 
       */
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      trigger(receiver, key);
      // 注意，set代理应当返回一个布尔值。严格模式下，set代理如果没有返回true，就会报错。
      return true;
    },
  };

  return new Proxy(target, handler);
};

// vue3中的 ref 函数
function ref(initValue) {
  return reactive({
    value: initValue
  })
};

function computed(fn) {
  const result = ref()
  effect(() => result.value = fn())
  return result;
}

module.exports.ref = ref;
module.exports.reactive = reactive;
module.exports.computed = computed;