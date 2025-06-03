import { describe, expect, test } from 'vitest'

import { cleanInput } from './repl'

describe.each([
  {
    input: '  hello  world  ',
    expected: ['hello', 'world'],
  },
  {
    input: 'this is a robbery',
    expected: ['this', 'is', 'a', 'robbery'],
  },
  {
    input: 'Not  on  my  watch!',
    expected: ['not', 'on', 'my', 'watch!'],
  },
])('cleanInput($input)', ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input)
    expect(actual).toHaveLength(expected.length)
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i])
    }
  })
})
