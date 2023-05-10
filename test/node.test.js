/**
 * Just it was testing the runner test native of NodeJS
 */
import test from "node:test";
import assert from "node:assert";

test("Example test", () => {
  assert.equal(1, 1);
});

test("Example object test", () => {
  assert.deepEqual({ a: 1 }, { a: 1 }, "Objects are not equal");
});

test("Async test example", async () => {
  const number = await Promise.resolve(3);
  assert.equal(number, 3, "number is not equal to 3");
});
