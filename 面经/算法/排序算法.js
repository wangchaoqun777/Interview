// - 水桶排序

var arr = [8, 19, 20, 32, 7, 18, 5, 30];

// var maxVal = Math.max.apply(false, arr);

// var newArr = new Array(maxVal);
// var _arr = [];
// for (var i = 0; i < arr.length; i++) {
//   newArr[arr[i]] = "water";
// }

// for (var i in newArr) {
//   _arr.push(parseInt(i));
// }

// 冒泡排序 前后比较，每次最后一个值都是最大的
// for (let i = 0; i < arr.length - 1; i++) {
//   for (let j = 0; j < arr.length - 1 - i; j++) {
//     if (arr[j] > arr[j + 1]) {
//       let temp = arr[j];
//       arr[j] = arr[j + 1];
//       arr[j + 1] = temp;
//     }
//   }
// }

// 选择排序 指定一个最小的，然后与剩下的两两比较交换位置
// for (var i = 0; i < arr.length - 1; i++) {
//   for (var j = i + 1; j < arr.length; j++) {
//     if (arr[i] > arr[j]) {
//       var temp = arr[i];
//       arr[i] = arr[j];
//       arr[j] = temp;
//     }
//   }
// }


// 快速排序
function fast(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var minNumber = parseInt(arr.length / 2);
  var minVal = arr[minNumber];
  var left = [];
  var right = [];
  for (i = 0; i < arr.length; i++) {
    if (arr[i] == minVal) {
      continue;
    }
    if (arr[i] < minVal) {
      left.push(arr[i]);
    } else if (arr[i] > minVal) {
      right.push(arr[i]);
    }
  }
  return fast(left).concat(minVal, fast(right));
}
console.log(fast(arr));
