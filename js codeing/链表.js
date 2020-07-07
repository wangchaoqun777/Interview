function LinkedList() {
  // Node 类声明
  let Node = function(element) {
    this.element = element;
    this.next = null;
  };
  // 初始化链表长度
  let length = 0;
  // 初始化第一个元素
  let head = null;
  this.append = function(element) {
    // 初始化添加node实例
    let node = new Node(element),
      current;
    if (head === null) {
      // 第一个node实例进入链表，之后这个linkedList实例中head就不为空
      head = node;
    } else {
      current = head;
      // 循环链表找到最后一项，循环结束current指向链表最后一个元素
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };

  this.insert = function(postion, element) {
    // 检查是否越界，超过链表长度或是小于0不符合逻辑
    if (postion >= 0 && postion <= length) {
      let node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) {
        // 添加到第一个位置
        node.next = current;
        head = node;
      } else {
        // 循环链表找到正确位置，循环完毕，previous,current分别被添加到元素的前一个和后一个元素
        while (index++ < postion) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function(postion) {
    // 检查是否越界，超过表长度或是小于0的不符合逻辑
    if (postion > -1 && postion < length) {
      let current = head,
        previous,
        index = 0;
      if (postion === 0) {
        head = current.next;
      } else {
        while (index++ < postion) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };

  this.indexof = function(element) {
    let current = head,
      index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };
}
