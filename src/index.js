import { ref, reactive, computed, effect } from './reactivity'


const person = reactive({
    name: 'charlie',
    age: 12,
    arr: [1, 23, 3]
})

person.arr.push(4)
