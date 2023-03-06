export const typedResolver = <T, K extends any[], L>(
  fn: (root: T, ...params: K) => L
) => {
  return (root: any, ...params: K) => fn(root, ...params);
};

export function pickFirstKey<T>(obj: Record<string, any> = {}): T {
  for (const key of Object.keys(obj || {})) {
    return obj[key];
  }
  throw new Error(`Invalid record!`);
}
