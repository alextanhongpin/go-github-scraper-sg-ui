async function main () {
  // await test1()
  await test2()
}

async function test1 () {
  const response = fetchData()
  for await (let result of response) {
    if (result instanceof Error) {
      console.log('is error', result)
      break
    }
    console.log(result)
  }
  console.log(await response.next())
  const data3 = await response.next()
  console.log(data3)
}

async function test2 () {
  const gen = fetchWithParams()
  console.log(await gen.next(1))
  console.log(await gen.next(2))
  console.log(await gen.next(3))
  console.log(await gen.next(2))
}

async function * fetchData () {
  let counter = 0
  let retry = 0
  while (true) {
    console.log('trigger at counter', counter)
    try {
      const nextCursor = await delay(1000, counter)
      console.log('fetched', nextCursor)
      yield nextCursor
      counter = nextCursor
      retry = 0
    } catch (error) {
      retry += 1
      if (retry > 3) {
        yield new Error('error too many retries')
        break
      }
      console.log(error)
    }
  }
}
async function * fetchWithParams () {
  let counter = 0
  const m = new Map()
  while (true) {
    if (m.has(counter)) {
      console.log('fetched', counter)
      yield m.get(counter)
    } else {
      try {
        const result = await delay(1000, counter)
        m.set(counter, result)
        counter = yield result
        console.log('yielding', counter)
      } catch (error) {
        console.log(error)
        yield error
        // break
      }
    }
  }
}

function delay (duration, counter = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      true
      // Math.random() < 0.5
        ? resolve(counter + 1)
        : reject(new Error('bad'))
    }, duration)
  })
}

main().catch(console.error)
