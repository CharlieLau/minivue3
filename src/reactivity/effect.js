export function effect(fn, options = {}) {
    const effect = createReactiveEffect(fn, options)
    if (!options.lazy) {
        effect()
    }
    return effect
}
let uid = 0

let activeEffect
let effectStack = [] // 避免effect内 递归调用

function createReactiveEffect(fn, options) {

    const effect = function reactiveEffect() {
        if (effectStack.includes(effect)) { // 避免effect内 递归调用
            return;
        }
        try {
            effectStack.push(effect)
            activeEffect = effect;
            return fn()
        } finally {
            effectStack.pop()
            activeEffect = effectStack[effectStack.length - 1]
        }
    }

    effect.id = uid++
    effect.options = options
    effect.deps = []
    return effect
}


// {a:1,b:2}:{ a: [effect1,effect2] }
// weakMap(target) -> Map(key) -> Set(effect)
const targetMap = new WeakMap()
export function track(target, type, key) {
    if (activeEffect === undefined) {
        return;
    }
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep) // 相互引用 以备后用
    }

}

export function trigger(target, type, key, value, oldValue) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return;
    function run(effects) {
        if (effects) {
            effects.forEach(effect => effect())
        }
    }
    if (key !== null) {
        run(depsMap.get(key))
    }
    if (type === 'add') {
        // array push 的时候 会先取length  所以 depMap会有length的收集
        run(depsMap.get(Array.isArray(target) ? 'length' : ''))
    }
}