const { ref, computed } = require('./index.js')
let num = ref(5)

let sum = computed(() => num.value * 1000)

console.log(sum) // 500

num.value = 10

console.log(sum) // 1000