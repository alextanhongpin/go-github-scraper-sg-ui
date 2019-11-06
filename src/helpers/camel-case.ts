export function toCamelCase (snakeCaseString: string): string {
  return snakeCaseString.replace(/(_\w)/g, matches => matches[1].toUpperCase())
}

export function toCamelCaseObject (obj: any): any {
  for (let key in obj) {
    const newKey = toCamelCase(key)
    if (key !== newKey) {
      obj[newKey] = obj[key]
      Reflect.deleteProperty(obj, key)
    }
  }
  return obj
}
