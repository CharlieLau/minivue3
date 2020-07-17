
import { isObject, hasOwn, hasChange } from '../shared/util'
import { reactive } from './reactive'
import { track, trigger } from './effect'

const get = createGetter()
const set = createSetter()



export const mutableHanlder = {
    get,
    set
}

function createGetter() {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver)
        // console.log('取值', key)
        track(target, 'get', key)
        if (isObject(res)) {
            return reactive(res)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        const hasKey = hasOwn(target, key)
        const oldValue = target[key]
        const result = Reflect.set(target, key, value, receiver)
        if (!hasKey) {
            // console.log('设置新属性', key)
            trigger(target, 'add', key, value)
        } else if (hasChange(value, oldValue)) {
            trigger(target, 'set', key, value, oldValue)
            // console.log('设置值', key, value)
        }
        return result
    }
}