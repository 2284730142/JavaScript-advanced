;(function (global, undefined) {
    'use strict';
    var _global;
    Function.prototype.bind = Function.prototype.bind || function (context) {
        var that = this;
        return function () {
            return that.apply(context, arguments);
        }
    };

    // start my code
    function Stack() {
        var items = [];
        this.push = function (element) {
            items.push(element);
        };
        this.pop = function () {
            return items.pop();
        };
        this.peek = function () {
            return items[items.length - 1];
        };
        this.isEmpty = function () {
            return items.length === 0;
        };
        this.size = function () {
            return items.length;
        };
        this.clear = function () {
            items = [];
        };
        this.print = function () {
            console.log(items.toString());
        };
    }

    function Queue() {
        var items = [];
        this.enqueue = function (element) {
            items.push(element);
        };
        this.dequeue = function () {
            return items.shift();
        };
        this.front = function () {
            return items[0];
        };
        this.isEmpty = function () {
            return items.length === 0;
        };
        this.clear = function () {
            items = [];
        };
        this.size = function () {
            return items.length;
        };
        this.print = function () {
            console.log(items.toString());
        }
    }

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
        this.toString = function () {
            var current = head;
            var string = '';
            while (current) {
                string += current.element;
                current = current.next;
            }
            return string;
        };
        this.print = function () {
            console.log(this.toString());
        };
    }

    function DoublyLinkedList() {
        var Node = function (element) {
            this.element = element;
            this.next = null;
            this.prev = null;
        };

        var length = 0;
        var head = null;
        var tail = null;

        this.insert = function (position, element) {
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

    function Set() {
        var items = {};
        this.add = function (value) {
            if (!this.has(value)) {
                items[value] = value;
                return true;
            }
            return false;
        };
        this.remove = function (value) {
            if (!this.has(value)) {
                delete items[value];
                return true;
            }
            return false;
        };
        this.has = function (value) {
            return items.hasOwnProperty(value);
        };
        this.clear = function () {
            items = {};
        };
        this.size = function () {
            var count = 0;
            for (var prop in items) {
                if (items.hasOwnProperty(prop))
                    ++count;
            }
            return count;
        };
        this.values = function () {
            var keys = [];
            for (var key in items) {
                keys.push(key);
            }
            return keys;
        };
        this.union = function (otherSet) {
            var unionSet = new Set();
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                unionSet.add(values[i]);
            }
            values = otherSet.values();
            for (var j = 0; j < values.length; j++) {
                unionSet.add(values[j]);
            }
            return unionSet;
        };
        this.intersection = function (otherSet) {
            var intersectionsSet = new Set();
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                if (otherSet.has(values[i])) {
                    intersectionsSet.add(values[i]);
                }
            }
            return intersectionsSet;
        };
        this.difference = function (otherSet) {
            var differenceSet = new Set();
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                if (!otherSet.has(values[i])) {
                    differenceSet.add(values[i]);
                }
            }
            return differenceSet;
        };
        this.subset = function (otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            } else {
                var values = this.values();
                for (var i = 0; i < values.length; i++) {
                    if (!otherSet.has(values[i])) {
                        return false;
                    }
                }
                return true;
            }
        }
    }

    function Dictionary() {
        var items = {};
        this.set = function (key, value) {
            items[key] = value;
        };
        this.remove = function (key) {
            if (this.has(key)) {
                delete items[key];
                return true;
            }
            return false;
        };
        this.has = function (key) {
            return key in items;
        };
        this.get = function (key) {
            return this.has(key) ? items[key] : undefined;
        };
        this.clear = function () {
            items = {};
        };
        this.size = function () {
            var count = 0;
            for (var prop in items) {
                if (items.hasOwnProperty(prop))
                    ++count;
            }
            return count;
        };
        this.keys = function () {
            var keys = [];
            for (var key in items) {
                keys.push(key);
            }
            return keys;
        };
        this.values = function () {
            var values = {};
            for (var k in items) {
                if (this.has(k)) {
                    values.push(items[k]);
                }
            }
            return values;
        };
    }

    function HashTable() {
        var table = [];
        var djb2HashCode = function (key) {
            var hash = 5381;
            for (var i = 0; i < key.length; i++) {
                hash = hash * 33 + key.charCodeAt(i);
            }
            return hash % 1013;
        };
        this.put = function (key, value) {
            var position = djb2HashCode(key);
            table[position] = value;
        };
        this.remove = function (key) {
            table[djb2HashCode(key)] = undefined;
        };
        this.get = function (key) {
            return table[djb2HashCode(key)];
        };
    }

    function BinarySearchTree() {
        var Node = function (key) {
            this.key = key;
            this.left = null;
            this.right = null;
        };
        var root = null;
        var insertNode = function (node, newNode) {
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
        this.insert = function (key) {
            var newNode = new Node(key);
            if (root === null) {
                root = newNode;
            } else {
                insertNode(root, newNode);
            }
        };
        var searchNode = function (node, key) {
            if (node === null) {
                return false;
            }
            if (key < node.key) {
                return searchNode(node.left, key);
            } else if (key > node.key) {
                return searchNode(node.right, key)
            } else {
                return true;
            }
        };
        this.search = function (key) {
            return searchNode(root, key);
        };
        var inOrderTraverseNode = function (node, callback) {
            if (node !== null) {
                inOrderTraverseNode(node.left, callback);
                callback(node.key);
                inOrderTraverseNode(node.right, callback);
            }
        };
        this.inOrderTraverse = function (callback) {
            inOrderTraverseNode(root, callback);
        };
        var preOrderTraverseNode = function (node, callback) {
            if (node !== null) {
                callback(node.key);
                preOrderTraverseNode(node.left, callback);
                preOrderTraverseNode(node.right, callback);
            }
        };
        this.preOrderTraverse = function (callback) {
            preOrderTraverseNode(root, callback);
        };
        var postOrderTraverseNode = function (node, callback) {
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        };
        this.postOrderTraverse = function (callback) {
            postOrderTraverseNode(root, callback);
        };
        var minNode = function (node) {
            if (node) {
                while (node && node.left !== null) {
                    node = node.left;
                }
                return node.key;
            }
            return null;
        };
        this.min = function () {
            return minNode(root);
        };
        var maxNode = function (node) {
            if (node) {
                while (node && node.right !== null) {
                    node = node.right;
                }
                return node.key;
            }
            return null;
        };
        this.max = function () {
            return maxNode(root);
        };
        var removeNode = function (node, key) {
            if (node === null) {
                return null;
            }
            if (key < node.key) {
                node.left = removeNode(node.left, key);
                return node;
            } else if (key > node.key) {
                node.right = removeNode(node.right, key);
                return node;
            } else {
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }
                if (node.left === null) {
                    node = node.right;
                    return node;
                } else if (node.right === null) {
                    node = node.left;
                    return node;
                }
                var aux = minNode(node.right);
                node.key = aux.key;
                node.right = removeNode(node.right, aux.key);
                return node;
            }
        };
        this.remove = function (key) {
            root = removeNode(root, key);
        };
    }

    function Graph() {
        var vertices = [];
        var time = 0;
        var adjList = new Dictionary();
        this.addVertex = function (v) {
            vertices.push(v);
            adjList.set(v, []);
        };
        this.addEdge = function (v, w) {
            adjList.get(v).push(w);
            adjList.get(w).push(v);
        };
        this.toString = function () {
            var s = '';
            for (var i = 0; i < vertices.length; i++) {
                s += vertices[i] + ' -> ';
                var neighbors = adjList.get(vertices[i]);
                for (var j = 0; j < neighbors.length; j++) {
                    s += neighbors[j] + ' ';
                }
                s += '\n';
            }
            return s;
        };
        var initializeColor = function () {
            var color = [];
            for (var i = 0; i < vertices.length; i++) {
                color[vertices[i]] = 'white';
            }
            return color;
        };
        this.BFS = function (v) {
            var color = initializeColor();
            var queue = new Queue();
            var d = [];
            var pred = [];
            queue.enqueue(v);
            for (var i = 0; i < vertices.length; i++) {
                d[vertices[i]] = 0;
                pred[vertices[i]] = null;
            }
            while (!queue.isEmpty()) {
                var u = queue.dequeue();
                var neighbors = adjList.get(u);
                color[u] = 'grey';
                for (var j = 0; j < neighbors.length; j++) {
                    var w = neighbors[j];
                    if (color[w] === 'white') {
                        color[w] = 'grey';
                        d[w] = d[u] + 1;
                        pred[w] = u;
                        queue.enqueue(w);
                    }
                }
                color[u] = 'black';
            }
            return {
                distances: d,
                predecessors: pred
            }
        };
        var DFSVisit = function (u, color, d, f, p) {
            color[u] = 'grey';
            d[u] = ++time;
            var neighbors = adjList.get(u);
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w] === 'white') {
                    p[w] = u;
                    DFSVisit(w, color, d, f, p);
                }
            }
            color[u] = 'black';
            f[u] = ++time;
        };
        this.DFS = function (callback) {
            var color = initializeColor();
            var d = [];
            var f = [];
            var p = [];
            var time = 0;
            for (var i = 0; i < vertices.length; i++) {
                f[vertices[i]] = 0;
                d[vertices[i]] = 0;
                p[vertices[i]] = null;
            }
            for (var j = 0; j < vertices.length; j++) {
                if (color[vertices[j]] === 'white') {
                    DFSVisit(vertices[j], color, d, f, p);
                }
            }
            return {
                discovery: d,
                finished: f,
                predecessors: p
            };
        }
    }
    // end my code

    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Stack;
        module.exports = Queue;
        module.exports = LinkedList;
        module.exports = DoublyLinkedList;
        module.exports = Set;
        module.exports = Dictionary;
        module.exports = HashTable;
        module.exports = BinarySearchTree;
        module.exports = Graph;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return Stack;
        });
        define(function () {
            return Queue;
        });
        define(function () {
            return LinkedList;
        });
        define(function () {
            return DoublyLinkedList;
        });
        define(function () {
            return Set;
        });
        define(function () {
            return Dictionary;
        });
        define(function () {
            return HashTable;
        });
        define(function () {
            return BinarySearchTree;
        });
        define(function () {
            return Graph;
        });
    } else {
        !('Stack' in _global) && (_global.sortArray = Stack);
        !('Queue' in _global) && (_global.searchArray = Queue);
        !('LinkedList' in _global) && (_global.searchArray = LinkedList);
        !('DoublyLinkedList' in _global) && (_global.searchArray = DoublyLinkedList);
        !('Set' in _global) && (_global.searchArray = Set);
        !('Dictionary' in _global) && (_global.searchArray = Dictionary);
        !('HashTable' in _global) && (_global.searchArray = HashTable);
        !('BinarySearchTree' in _global) && (_global.searchArray = BinarySearchTree);
        !('Graph' in _global) && (_global.searchArray = Graph);
    }
}());
