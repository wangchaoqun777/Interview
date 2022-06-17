function currying(fn) {
  var allArgs = [];

  return function next() {
    console.log("item", arguments);
    var args = [].slice.call(arguments);

    if (args.length > 0) {
      allArgs = allArgs.concat(args);
      return next;
    } else {
      return fn.apply(null, allArgs);
    }
  };
}
var add = currying(function(){
  var sum = 0;
  for(var i = 0; i < arguments.length; i++){
      sum += arguments[i];
  }
  return sum;
});

console.log(add(1)(2, 3)(4)(5));

1. 调用add 等于调用 next
2. 通过判断参数数量 不断链式调用， 并通过闭包存储 参数值
3. 当参数为空时， 触发执行传入的函数

- 逐步接受参数，并缓存参数提供给后期进行计算
- bind 是典型的柯里化

