export const devServer = {
    proxy: {
      '/api': {
        // target: 'http://localhost:5000',
        target: 'http://api.kdanish.com',
        changeOrigin: true,
        secure: false,
      },
    },
  };
  