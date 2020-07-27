// 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

function mySetInterVal(fn, a, b) {
  let timer = null;
  let n = 0;
  const loop = () => {
    timer = setTimeout(() => {
      fn();
      n++;
      loop();
    }, a + n * b);
  };
  loop();
  return () => {
    clearTimeout(timer);
  };
}

// const clear = mySetInterVal(() => {
//   console.log("1"), 5000, 100;
// });

// 斐波那契数列 [1,1,2,3,5]
// 2.求斐波那契数列第n项
function fabonaci(n, v1 = 1, v2 = 1) {
  if (n === 1) return v1;
  if (n === 2) return v2;
  return fabonaci(n - 1, v2, v1 + v2);
}
// console.log(fabonaci(6));

// 3.菲波那7⃣数列

function getFabonic(n) {
  let arr = [1, 1];
  let sum1 = 1,
    sum2 = 1,
    sum;
  for (let i = 3; i < n; i++) {
    sum = sum1 + sum2;
    sum1 = sum2;
    sum2 = sum;
    arr.push(sum);
  }
  return data;
}

// 4.字符串出现的不重复最长长度
var str = "ttkskgkgllb";

function maxLen(str) {
  return [...new Set(str)];
}
// console.log(maxLen(str));

function longNoRepeatStr(str) {
  let max = -Infinity;
  let count = 0;
  let pre = null;

  for (let index = 0; index < str.length; index += 1) {
    const cur = str[index];

    if (cur !== pre) {
      count += 1;
    } else {
      count = 1;
    }

    pre = cur;
    if (count > max) max = count;
  }
  return max;
}

console.log(longNoRepeatStr("dabcdeaabccd"));
