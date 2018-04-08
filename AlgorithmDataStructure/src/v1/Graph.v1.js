/*
* 图：用邻接表来表示图（图有很多种表示的方式，需要深入学习）
* 深度和广度优先遍历太6了，我目前看不懂
* */
function Graph() {
    // 保存所有定点的名字
    var vertices = [];
    // 字典存储邻接表（使用定点的名字作为键，邻接顶点列表作为值）
    var adjList = new Dictionary();
    // 添加定点和边
    this.addVertex = function (v) {
        vertices.push(v);
        adjList.set(v, []);
    };
    // 接受两个顶点作为参数
    this.addEdge = function (v, w) {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    };
    // 辅助：输出
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

    /*
    * 广度优先搜索算法
    * */
    var initializeColor = function () {
        var color = [];
        for (var i = 0; i < vertices.length; i++) {
            color[vertices[i]] = 'white';
        }
        return color;
    };
    this.bfs = function (v, callback) {
        var color = initializeColor();
        var queue = new Queue();
        queue.enqueue(v);
        while (!queue.isEmpty()) {
            var u = queue.dequeue();
            var neighbors = adjList.get(u);
            color[u] = 'grey';
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
            if (callback) {
                callback(u);
            }
        }
    };
    // 上面bfs的改进版本
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
    /*
    * 深度优先搜素算法
    * */
    var dfsVisit = function (u, color, callback) {
        color[u] = 'grey';
        if (callback) {
            callback(u);
        }
        var neighbors = adjList.get(u);
        for (var i = 0; i < neighbors.length; i++) {
            var w = neighbors[i];
            if (color[w] === 'white') {
                dfsVisit(w, color, callback);
            }
        }
        color[u] = 'black';
    };
    this.dfs = function (callback) {
        var color = initializeColor();
        for (var i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === 'white') {
                dfsVisit(vertices[i], color, callback);
            }
        }
    };
    // 上面dfs的改进版本
    var time = 0;
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
}