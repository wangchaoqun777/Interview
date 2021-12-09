// 存贮有序元素的集合;
// 但是不同于数组,每个元素是一个存贮元素本身的节点和指向下一个元素引用组成

// class Node {
//   constructor (element){
//     this.element = element
//     this.next = null
//   }
// }

// class LinkedList {
//   constructor () {
//     this.head = null
//     this,length = 0
//   }
//   append (element) {
//     consot
//     const current = null

//   }
// }

// head current next

// 二叉树
// 每个节点最多有两个子树的树结构
// 相对本节点较小的值保存在左节点，相对本节点较大的值保存在右节点</b>，该特性能让查值效率提高！
// 树结构
class NodeTree {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySeachTree {
  constructor() {
    this.root = null;
  }

  // 插入一个节点
  insert(key) {
    // 创建一个节点
    const newNode = new NodeTree(key);
    // 插入方法
    const insertNode = (node, newNode) => {
      //     11            12 通过key判断是插入到左边还是右边
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };
    if (!this.root) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
    }
  }
  // 访问树节点的三种方式: 中序，先序，后序
  inOrderTraverse(callback) {
    const inOrderTraverseNode = (node, callback) => {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.key);
        inOrderTraverseNode(node.right, callback);
      }
    };
    inOrderTraverseNode(this.root, callback);
  }

  min(node) {
    console.log("root", this.root);
    const minNode = node => {
      return node ? (node.left ? minNode(node.left) : node) : null;
    };
    return minNode(node || this.root);
  }

  max(node) {
    const maxNode = node => {
      return node ? (node.right ? maxNode(node.right) : node) : null;
    };
    return maxNode(node || this.root);
  }
}

const tree = new BinarySeachTree();

tree.insert(1);
tree.insert(3);
tree.insert(2);
// tree.insert(5);
// tree.insert(4);
// tree.inOrderTraverse(value => {
//   console.log(value);
// });
// console.log(tree.min());
// console.log(tree.max());
