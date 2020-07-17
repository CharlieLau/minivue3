
import { isObject, hasOwn, hasChange } from '../shared/util'
import { reactive } from './reactive'
const get = createGetter()

const set = createSetter()



export const mutableHanlder = {
    get,
    set
}

function createGetter() {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver)
        console.log('取值', key)
        if (isObject(res)) {
            return reactive(res)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        const oldValue = target[key]
        const result = Reflect.set(target, key, value, receiver)
        if (!hasOwn(target, key)) {
            console.log('设置新属性', key)
        } else if (hasChange(value, oldValue)) {
            console.log('设置值', key, value)
        }

        return result
    }
}