export const devServer = {
  proxy: {
    "/api": {
      target: "http://api.kdanish.com",
      changeOrigin: true,
      secure: false,
    },
    "/uploads": {
      target: "http://api.kdanish.com",
      changeOrigin: true,
      secure: false,
    },
    configureWebpack: {
      plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    },
  },
};
