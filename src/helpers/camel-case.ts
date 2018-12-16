export function toCamelCase (snakeCaseString: string): string {
  return snakeCaseString.replace(/(_\w)/g, (matches) => matches[1].toUpperCase())
}

