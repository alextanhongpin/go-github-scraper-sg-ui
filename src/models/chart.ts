export function chartData (x: string[], y: number[], colorFn?: any) {
  return {
    datasets: [
      {
        data: y,
        ...(colorFn ? { backgroundColor: x.map(colorFn) } : {})
      }
    ],
    labels: x
  }
}
