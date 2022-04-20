"node-sass": "^5.0.0",
"sass": "^1.50.1",
"sass-loader": "^5.0.1",

mian.js import './styles/element-variables.scss'

新建文件 element-variables.scss
/* 改变主题色变量 */
$--color-primary: #5d769d;

$--font-path: '~element-ui/lib/theme-chalk/fonts';/* 改变 icon 字体路径变量，必需 */

@import "~element-ui/packages/theme-chalk/src/index";