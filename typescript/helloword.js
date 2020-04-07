"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 变量类型
var age = 18;
var height = 178.5;
var jss = '技术胖';
var zhende = true;
var HUNMAN;
(function (HUNMAN) {
    HUNMAN["nan"] = "\u7537\u4EBA";
    HUNMAN["nv"] = "\u5973\u4EBA";
    HUNMAN["yao"] = "\u5996";
})(HUNMAN || (HUNMAN = {}));
var t = 10;
function search(age) {
    return '找到了' + age + 'aha';
}
function search1(age, height) {
    var yy = '';
    yy = '找到了' + age + '岁';
    if (height != undefined) {
        yy = yy + height;
    }
    return yy;
}
function search2() {
    var canshu = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        canshu[_i] = arguments[_i];
    }
    var yy = '';
    return yy;
}
// 函数
function add(n1, n2) {
    return n1 + n2;
}
var add1 = function (n1, n2) {
    return n1 + n2;
};
var reuslt = search(age);
var result1 = search1(age, height);
console.log(age, height, jss, zhende, HUNMAN.yao, reuslt, result1, add1(1, 2));
// 变量的作用域
// function zhengxing():void {
//   console.log(yangzi) // 出现变量提升
//   var yangzi:string = 'liudude'
// }
// zhengxing(yangzi)
// 全局变量 局部变量
function view() {
    var yangzia = '刘德华';
    {
        var yangzib = '小生杨';
    }
}
// 引用类型
var jspang = {
    name: "jishupang",
    website: 'jspang',
    age: '18',
    say: function () {
        console.log('weilebuluo');
    }
};
console.log(jspang.name);
jspang.say();
