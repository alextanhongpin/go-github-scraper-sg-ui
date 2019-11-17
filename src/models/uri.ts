export function trimStartSlash (str = ''): string {
  return str.startsWith('/') ? str.substring(1) : str
}

export function trimEndSlash (str = ''): string {
  return str.endsWith('/') ? str.substring(0, str.length - 1) : str
}

interface ComposeFunction<T> {
  (a: T): T
}

export function compose<T> (...fns: ComposeFunction<T>[]) {
  return function (value: T): T {
    return fns.reduce((result: T, fn: ComposeFunction<T>) => {
      return fn(result)
    }, value)
  }
}

export function endpoint (
  paths: TemplateStringsArray,
  ...placeholders: string[]
): string {
  const trimAll = compose<string>(
    trimStartSlash,
    trimEndSlash
  )
  const basePath = process.env.VUE_APP_API_URI
  return paths.reduce((result: string, str: string, i: number) => {
    return [result, str, placeholders[i]]
      .map(trimAll)
      .filter(i => i.length > 0)
      .join('/')
  }, basePath)
}
