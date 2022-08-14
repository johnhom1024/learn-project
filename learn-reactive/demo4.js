// 如果 reactive里面的get方法写成 return target[key]，丢弃了Reflect，会怎么样?

let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};


function reactive1(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      return target[key];
    },
  })
}

let userProxy = reactive1(user)


console.log(userProxy.name); // => Guest

// 下面我们来看继承的情况

let admin = {
  __proto__: userProxy,
  _name: "Admin"
}

// 发现这里输出的name，依旧是原型对象上的user._name的值
console.log(admin.name) // => Guest

/**
 * 问题实际上出在代理所在的行中:

当我们阅读时admin.name，由于admin对象没有自己的属性，搜索将转到其原型。
原型是userProxy
name从代理读取属性时，其get将触发并从原始对象中返回该属性，它在上下文中运行其代码this=target。因此，结果this._name来自原始对象target，即：from user。
 */


// 如果使用了Reflect.get

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
  })
}

let userProxy1 = reactive(user);

let admin1 = {
  __proto__: userProxy1,
  _name: 'Admin1'
}

// 这里的输出就正常了
console.log(admin1.name); // => 'Admin1'


// Reflect.get中receiver参数，保留了对正确引用this（即admin）的引用，该引用将Reflect.get中正确的对象使用传递给get。

