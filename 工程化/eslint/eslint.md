- 斑马代码检查设置
  - vue
  - package.json
  ```js
    "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "@vue/standard",
      "@vue/prettier"
    ],
    "rules": {
      "vue/require-prop-type-constructor": "off",
      "vue/require-valid-default-prop": "off",
      "camelcase": 0,
      "template-curly-spacing": "off",
      "indent": "off",
      "prettier/prettier": "error"
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
  ```
