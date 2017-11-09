function destructureToInvokeArray (toInvoke) {
  let [obj, fn] = toInvoke
  // if (!(obj instanceof Object)) throw new Error('first element of toInvoke must be an object')

  if (typeof fn === 'string') {
    fn = obj[fn]
    if (!(typeof fn === 'function')) throw new Error('second element of toInvoke must indicate a function')
  } else if (typeof fn === 'function') {
    // nothing
  } else throw new Error('second element of toInvoke must be a Function or a string')

  return [obj, fn]
}

function destructureToInvoke (toInvoke) {
  if (toInvoke instanceof Array) {
    return destructureToInvokeArray(toInvoke)
  } else if (typeof toInvoke === 'function') {
    return [undefined, toInvoke]
  } else {
    throw new Error('toInvoke must be a Function or an Array [obj, fn] or an Array [obj, "fnName"]')
  }
}

export function call (toInvoke, ...args) {
  const [obj, fn] = destructureToInvoke(toInvoke)
  return {type: 'CALL', obj, fn, args}
}

export function apply (obj, fn, ...args) {
  return call([obj, fn], ...args)
}

export default {
  call, apply,
}
