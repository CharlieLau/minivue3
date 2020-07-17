export const isObject = (obj) => typeof obj === 'object' && obj !== null

export const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

export const hasChange = (origin, target) => origin !== target