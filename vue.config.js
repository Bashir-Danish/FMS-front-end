export const devServer = {
    proxy: {
      '/api': {
        target: 'https://api.kdanish.com',
        changeOrigin: true,
        secure: false,
      },
    },
  };
  