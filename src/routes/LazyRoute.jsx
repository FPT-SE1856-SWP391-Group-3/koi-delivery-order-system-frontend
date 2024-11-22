export function LazyRoute(componentPath) {
  return () =>
      import(componentPath).then(module => ({ Component: module.default }));
}