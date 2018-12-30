const defaultKeyGetter = (params: any): string => {
  return params
}

export function Cache (fn: any, getter = defaultKeyGetter): any {
  const m = new Map()
  return async function (params: any) {
    const key = getter(params)
    if (m.has(key)) {
      return m.get(key)
    }
    const result = await fn.apply(this, arguments)
    m.set(key, result)
    return result
  }
}
