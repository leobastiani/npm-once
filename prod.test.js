// @ts-check

import { mock, test } from "node:test";
import assert from "node:assert";
import once from "./index.js";

test("once", () => {
  const myMock = mock.fn(() => 42);
  const onced = once(myMock);
  onced();
  onced();
  assert.strictEqual(myMock.mock.callCount(), 1);
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
});
