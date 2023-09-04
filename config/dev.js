module.exports = {
  env: {
    NODE_ENV: '"development"',
    TARO_APP_Request_URL: '"http://localhost:3000"',
  },
  defineConstants: {},
  // mini: {},
  h5: {
    devServer: {
      proxy: {
        "/artClass": {
          target: JSON.parse('"http://localhost:3000/"'), // 后端地址
          changeOrigin: false,
          pathRewrite: {
            "^/artClass": "",
          },
        },
      },
    },
  },
};
