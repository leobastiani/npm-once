import { expect, test, mock } from "bun:test";
import { once } from ".";

test("called just once", () => {
  const myMock = mock();
  const onced = once(myMock);
  onced();
  onced();
  expect(myMock).toBeCalledTimes(1);
});
