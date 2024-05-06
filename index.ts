// @ts-nocheck

export const resets = new Set();

function resetAll() {
  if (process.env.NODE_ENV !== "production") {
    while (resets.length) {
      resets.pop()();
    }
  }
}

export function once<T extends (...args: any[]) => any>(fn: T): T {
  let result: { return: any } | { error: any } | undefined;
  const reset = () => {
    result = undefined;
  };

  return ((...args: any[]) => {
    if (!result) {
      if (process.env.NODE_ENV !== "production") {
        resets.add(reset);
      }
      try {
        result = { return: fn(...args) };
      } catch (e) {
        result = { error: e };
      }
      fn = undefined;
    }
    if (result.error) {
      throw result.error;
    }
    return result.return;
  }) as T;
}
