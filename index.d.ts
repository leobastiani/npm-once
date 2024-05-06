export default function once<T extends (...args: any[]) => any>(fn: T): T;

export function resetAll(): void;
