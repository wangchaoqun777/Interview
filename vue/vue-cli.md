1、 - 问题： 路线排化项目不能进行热更新/sock的报错/显示跨域
- 解决办法如下
```js
    devServer: {
        https: true,
        disableHostCheck: true,
        port: 3000,
        public: '0.0.0.0:3000',
        proxy: {
            '/proxy-prefix': {
                target: process.env.PROXY_BASE_URL || '/',
                changeOrigin: true,
                pathRewrite: {
                    '^/proxy-prefix': '',
                }
            }
        },
    }
```

2、
  问题 项目运行自动打开浏览器
  "serve": "vue-cli-service serve --open",