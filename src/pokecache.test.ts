// src/pokecache.test.ts
import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  test("add and get returns stored value", () => {
    const cache = new Cache(10_000);
    cache.add("foo", { bar: 42 });

    const result = cache.get<{ bar: number }>("foo");

    expect(result).toBeDefined();
    expect(result?.bar).toBe(42);
  });
});
