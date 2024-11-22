export function lazyRoute(importPath) {
    return async () => {
        const module = await importPath
        return { Component: module.default }
    }
}
