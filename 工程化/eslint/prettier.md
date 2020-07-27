- 斑马代码风格设置

```js
// .prettierc.js
// "use strict";
module.exports = {
  singleQuote: true,
  semi: false,
  trailingComma: "none",
  printWidth: 80,
  proseWrap: "never",
  endOfLine: "lf"
  // overrides: [
  //   {
  //     files: ".prettierrc",
  //     options: {
  //       parser: "json",
  //     },
  //   },
  //   {
  //     files: "document.ejs",
  //     options: {
  //       parser: "html",
  //     },
  //   },
  // ],
};
```

- 代码风格示例
  module.exports = {
  "printWidth": 80, //一行的字符数，如果超过会进行换行，默认为 80
  "tabWidth": 2, //一个 tab 代表几个空格数，默认为 80
  "useTabs": false, //是否使用 tab 进行缩进，默认为 false，表示用空格进行缩减
  "singleQuote": false, //字符串是否使用单引号，默认为 false，使用双引号
  "semi": true, //行位是否使用分号，默认为 true
  "trailingComma": "none", //是否使用尾逗号，有三个可选值"<none|es5|all>"
  "bracketSpacing": true, //对象大括号直接是否有空格，默认为 true，效果：{ foo: bar }
  "parser": "babylon" //代码的解析引擎，默认为 babylon，与 babel 相同。
  }

- 代码风格忽略的相关设置

```js
// .prettierignore
**/*.svg
package.json
dist/
public/
.dockerignore
.DS_Store
.eslintignore
*.png
*.toml
docker
.editorconfig
Dockerfile*
.gitignore
.prettierignore
LICENSE
.eslintcache
*.lock
yarn-error.log
.history
./src/styles/icons/**
```
