// @ts-nocheck

export const resets = new Set();

export function resetAll() {
  if (process.env.NODE_ENV !== "production") {
    for (const fn of resets) {
      fn();
    }
    resets.clear();
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
      if (process.env.NODE_ENV === "production") {
        fn = undefined;
      }
    }
    if (result.error) {
      throw result.error;
    }
    return result.return;
  }) as T;
}
