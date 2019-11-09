export function chartData (x, y, colorFn) {
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
