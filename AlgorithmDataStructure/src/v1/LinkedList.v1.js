/*
        * 单向链表
        * */
function LinkedList() {

    // 辅助类（element：插入的元素，next：指向下一个元素的指针）
    var Node = function (element) {
        this.element = element;
        this.next = null;
    };

    // 私有变量（列表项数量）
    var length = 0;

    // 第一个节点的引用
    var head = null;

    // 列表尾部添加项
    this.append = function (element) {
        var node = new Node(element);
        var current;
        // 列表为空添加为第一个元素。列表不为空则追加元素
        if (head === null) {
            // 列表中第一个节点
            head = node;
        } else {
            current = head;
            // 循环列表直到最后一项（指针不为空时，将下个元素的指针赋给当前，直至为空）
            while (current.next) {
                current = current.next;
            }
            // 找到最后一项，将其next赋为node，建立连接
            current.next = node;
        }
        // 更新列表长度
        length++;
    };

    // 列表任意位置插入值
    this.insert = function (position, element) {
        // 检查越界
        if (position >= 0 && position <= length) {
            var node = new Node(element);
            var current = head;
            var previous;
            var index = 0;
            // 添加在第一位和后面位置需要判断
            if (position === 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                // 用图好解释。。。就是简单的改变两个指向
                node.next = current;
                previous.next = node;
            }
            // 更新列表长度
            length++;
            return true;
        } else {
            return false;
        }
    };

    // 列表特定位置移除项
    this.removeAt = function (position) {
        //检查越界值
        if (position > -1 && position < length) {
            var current = head;
            var previous;
            var index = 0;
            // 移除第一项
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                // 将previous与current的下一项链接起来：跳过current，从而移除它
                previous.next = current.next;
            }
            length--;
            // 返回当前节点的元素
            return current.element;
        } else {
            // 没有移除元素
            return null;
        }
    };

    // 返回头
    this.getHead = function () {
        return head;
    };

    // 返回元素在列表中的位置，如果没有就返回-1
    this.indexOf = function (element) {
        var current = head;
        var index = -1;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };

    // 判断列表是否为空
    this.isEmpty = function () {
        return length === 0;
    };

    // 返回列表包含元素个数
    this.size = function () {
        return length;
    };

    // 重写toString方法
    this.toString = function () {
        var current = head;
        var string = '';
        while (current) {
            string += current.element;
            // 最后一个元素迟早为空
            current = current.next;
        }
        return string;
    };

    // 打印
    this.print = function () {
        console.log(this.toString());
    };
}

/*
        * 双向链表(比单向列表多了一点东西，其实没差，画图很好理解)
        * */
function DoublyLinkedList() {
    var Node = function (element) {
        this.element = element;
        this.next = null;
        // 多了一个上一个指向
        this.prev = null;
    };

    var length = 0;
    var head = null;
    // 保存最后一项
    var tail = null;

    this.insert = function (position, element) {
        // 越界检查
        if (position >= 0 && position <= length) {
            var node = new Node(element);
            var current = head;
            var previous;
            var index = 0;
            if (position === 0) {
                if (!head) {
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            } else if (position === length) {
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            length++;
            return true;
        } else {
            return false;
        }
    };

    this.removeAt = function (position) {
        // 越界检查
        if (position >= 0 && position <= length) {
            var current = head;
            var previous;
            var index = 0;
            if (position === 0) {
                head = current.next;
                if (length === 1) {
                    tail = null;
                } else {
                    head.prev = null;
                }
            } else if (position === length - 1) {
                current = tail;
                tail = current.prev;
                tail.next = null;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    };
}

/*
        * 循环链表（尾部的next指向head）
        * 有单向和双向区别
        * */
function CircularLinkedList() {
    
}