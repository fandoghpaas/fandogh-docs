export const imports = {
  'guide/README.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "guide-readme" */ 'guide/README.mdx'),
}
