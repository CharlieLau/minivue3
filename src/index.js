import { ref, reactive, computed, effect } from './reactivity'


const person = reactive({
    name: 'charlie',
    age: 12,
    arr: [1, 23, 3]
})

// person.arr.push(4)
// 取值 arr
// 取值 push
// 取值 length
// 设置值 3 4


effect(() => {
    // console.log(person.name)
    console.log(JSON.stringify(person.arr))
    // person.name = 'jerry'  // effect 内改变 状态值 循环依赖收集 case
})
// person.name = 'jerry'


person.arr[2] = 100
person.arr.push(300)