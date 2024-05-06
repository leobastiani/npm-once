import { expect, mock, test } from "bun:test";
import { once, resetAll } from ".";

test("once", () => {
  const myMock = mock().mockReturnValue(42);
  const onced = once(myMock);
  onced();
  onced();
  expect(myMock).toBeCalledTimes(1);
  expect(onced()).toEqual(42);

  resetAll();
  onced();
  expect(myMock).toBeCalledTimes(2);
  expect(onced()).toEqual(42);
});
