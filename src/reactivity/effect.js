export function effect(fn, options = {}) {
    const effect = createReactiveEffect(fn, options)
    if (!options.lazy) {
        effect()
    }
    return effect
}
let uid = 0

let activeEffect = null
let effectStack = []

function createReactiveEffect(fn, options) {

    const effect = function () {

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