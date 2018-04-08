/*
        * 这里的LinkedList是为了给HashTable分离数据用的
        * */
function LinkedList() {
    var Node = function (element) {
        this.element = element;
        this.next = null;
    };
    var length = 0;
    var head = null;
    this.append = function (element) {
        var node = new Node(element);
        var current;
        if (head === null) {
            head = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        length++;
    };
    this.insert = function (position, element) {
        if (position >= 0 && position <= length) {
            var node = new Node(element);
            var current = head;
            var previous;
            var index = 0;
            if (position === 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
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
    this.removeAt = function (position) {
        if (position > -1 && position < length) {
            var current = head;
            var previous;
            var index = 0;
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
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
    this.getHead = function () {
        return head;
    };
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
    this.isEmpty = function () {
        return length === 0;
    };
    this.size = function () {
        return length;
    };
}

/*
* 哈希表（HashMap，Dictionary类的一种散列表实现）
* 这个是要解决冲突的写法
* */
function HashTable() {
    var table = [];
    // 私有方法散列函数
    var loseHashCode = function (key) {
        var hash = 0;
        // 利用每个字符的ASCII码值的和得到一个数字
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        // 这个37可以是任意值
        return hash % 37;
    };
    // 但是散列表中键值会有一定的冲突，所以要进行分离链接！建立一个辅助类ValuePair。(这是一种方式，也可以用序列值+1的形式来进行分离)
    var ValuePair = function (key, value) {
        this.key = key;
        this.value = value;
        // 只是辅助
        this.toString = function () {
            return '[' + this.key + '-' + this.value + ']';
        }
    };
    // 更新散列表
    this.put = function (key, value) {
        // 原始方案
        /*var position = loseHashCode(key);
        console.log(position + '-' + key);
        table[position] = value;*/
        // 分离链接
        var position = loseHashCode(key);
        if (table[position] === undefined) {
            table[position] = new LinkedList();
        }
        table[position].append(new ValuePair(key, value));
    };
    // 根据键值从散列表移除值
    this.remove = function (key) {
        // 原
        /*table[loseHashCode(key)] = undefined;*/
        // 分
        var position = loseHashCode(key);
        if (table[position] !== undefined) {
            var current = table[position].getHead();
            while (current.next) {
                if (current.element.key === key) {
                    table[position].remove(current.element);
                    if (table[position].isEmpty()) {
                        table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }
            // 检查是否为第一个或最后一个元素
            if (current.element.key === key) {
                table[position].remove(current.element);
                if (table[position].isEmpty()) {
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    };
    // 返回根据键值索引到的特定的值
    this.get = function (key) {
        // 原
        /*return table[loseHashCode(key)];*/
        // 分
        var position = loseHashCode(key);
        if (table[position] !== undefined) {
            // 遍历链表寻找键/值
            var current = table[position].getHead();
            while (current.next) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
            // 检查元素在链表第一个或最后一个节点的情况
            if (current.element.key === key) {
                return current.element.value;
            }
        }
        return undefined;
    };
}

/*
* 下面的这种不是最好的散列表写法，但是社区最为推荐的！
* 不用解决冲突
* */
/*function HashTable() {
    var table = [];
    // 更加灵活的形式：
    // 初始化一个hash并赋值为一个质数（5318），
    // 然后迭代参数key，
    // 将hash与33相乘（用来当做一个魔力数），
    // 并和当前迭代得到的字符ASCII码值相加，
    // 最后用相加的和与一个随机质数（比我们认为的散列表大小要大）相除的余数。
    var djb2HashCode = function (key) {
        var hash = 5381;
        for (var i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        // 假设散列表大小为1000，那么1013比1000大即可
        return hash % 1013;
    };
    this.put = function (key, value) {
        var position = djb2HashCode(key);
        console.log(position + '-' + key);
        table[position] = value;
    };
    this.remove = function (key) {
        table[djb2HashCode(key)] = undefined;
    };
    this.get = function (key) {
        return table[djb2HashCode(key)];
    };
}*/