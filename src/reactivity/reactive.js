
import { isObject } from '../shared/util'
import { mutableHanlder } from './baseHandlers'
export function reactive(target) {

    return createReactiveObject(target, mutableHanlder)
}

function createReactiveObject(target, baseHandler) {
    if (!isObject(target)) {
        return target
    }
    const observed = new Proxy(target, baseHandler)
    return observed;
}