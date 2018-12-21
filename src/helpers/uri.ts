
export function trimStartSlash (str: string): string {
  return str.startsWith('/')
    ? str.substring(1)
    : str
}

export function trimEndSlash (str: string): string {
  return str.endsWith('/')
    ? str.substring(0, str.length - 1)
    : str
}

export function endpoint (paths: TemplateStringsArray, ...placeholders: string[]): string {
  const basePath = process.env.VUE_APP_API_URI
  return [trimEndSlash(basePath)].concat(paths.map(trimStartSlash)).join('/')
}
