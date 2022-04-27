import { greetingFn } from '../exampleFn'
test('fn works', () => {
  const f = greetingFn()
  expect(f).toBe('hi')
  console.log(window)
})
