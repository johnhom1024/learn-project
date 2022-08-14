const { ref, computed } = require('./index.js')

// 使用数组进行测试
const nameList = ref([
  {
    name: 'junhong',
  },
  {
    name: 'meimei'
  }
]);


const nameListStr = computed(() => nameList.value.map(item => item.name).join(','));

console.log(nameListStr.value);


// 这里修改数组的值
nameList.value[0].name = 'Junhong';

// 这里并没有修改到
console.log(nameListStr.value);
// =>  junhong,meimei