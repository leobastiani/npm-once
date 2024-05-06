// @ts-check

import assert from "node:assert";
import { mock, test } from "node:test";
import { resetAll } from "./index.js";
import once from "./index.js";

test("success", () => {
  const myMock = mock.fn(() => 42);
  const onced = once(myMock);
  onced();
  onced();
  assert.strictEqual(myMock.mock.callCount(), 1);
  assert.strictEqual(onced(), 42);

  resetAll();
  onced();
  assert.strictEqual(myMock.mock.callCount(), 2);
  assert.strictEqual(onced(), 42);
});

test("errored", () => {
  const error = new Error();
  const myMock = mock.fn(() => {
    throw error;
  });
  const onced = once(myMock);
  assert.throws(() => onced(), error);
  assert.throws(() => onced(), error);
  assert.strictEqual(myMock.mock.callCount(), 1);

  resetAll();
  assert.throws(() => onced(), error);
  assert.strictEqual(myMock.mock.callCount(), 2);
});
