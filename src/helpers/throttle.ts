export function throttle (duration = 250) {
  let timeout: any
  return function (name: any, property: any, descriptor: any) {
    const originalValue = descriptor.value
    if (typeof originalValue === 'function') {
      descriptor.value = function () {
        timeout && clearTimeout(timeout)
        timeout = window.setTimeout(() => {
          originalValue.apply(this, arguments)
        }, duration)
      }
    }
    return descriptor
  }
}
