import { mock, test } from "node:test";
import assert from "node:assert";
import { once } from ".";

test("once", () => {
  const myMock = mock.fn(() => 42);
  const onced = once(myMock);
  onced();
  onced();
  assert.strictEqual(myMock.mock.callCount(), 1);
});
