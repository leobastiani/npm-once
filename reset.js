export const resets =
  process.env.NODE_ENV === "production" ? undefined : new Set();

export function resetAll() {
  if (process.env.NODE_ENV !== "production") {
    for (const fn of resets) {
      fn();
    }
    resets.clear();
  }
}
