

export const devServer = {
    proxy: {
        "*": {
            target: "https://api.kdanish.com",
            secure: false,
            changeOrigin: true,
        },
    },
};
  