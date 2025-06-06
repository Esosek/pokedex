import { describe, test, expect } from 'vitest'
import { Cache } from './pokecache.js'

describe('Cache', () => {
  test('should cache data', async () => {
    const cache = new Cache(500);

    cache.add('key', 'value');
    const cached = cache.get('key');
    expect(cached).toBe('value');
    cache.stopReapLoop();
  });
})

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 500));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
