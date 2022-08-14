const { reactive } = require('./index.js');
const { effect } = require('./utils.js');

const person = reactive({ name: 'johnhom' })


let nameStr1 = ''

const effectNameStr = () => {
  nameStr1 = '我的名字叫' + person.name;
}

effect(effectNameStr);


console.log(nameStr1);
person.name = 'meimei'

console.log(nameStr1)
