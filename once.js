import { resets } from "./reset.js";

export default function once(fn) {
  let result;
  const reset = () => {
    result = undefined;
  };
  return (...args) => {
    if (!result) {
      if (process.env.NODE_ENV !== "production") {
        resets.add(reset);
      }
      try {
        result = { return: fn(...args) };
      } catch (e) {
        result = { error: e };
      }
      if (process.env.NODE_ENV === "production") {
        fn = undefined;
      }
    }
    if (result.error) {
      throw result.error;
    }
    return result.return;
  };
}
