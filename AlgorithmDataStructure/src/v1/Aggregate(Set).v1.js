/*
        * 集合
        * */
function Set() {
    var items = {};
    /*
    * 基本方法
    * */
    // 向集合中添加元素
    this.add = function (value) {
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    };
    // 从集合中移除元素
    this.remove = function (value) {
        if (!this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    };
    // 判断值是否在集合中
    this.has = function (value) {
        return items.hasOwnProperty(value);
    };
    // 清除集合中所有元素
    this.clear = function () {
        items = {};
    };
    // 返回集合中所包含元素数量
    this.size = function () {
        return Object.keys(items).length;
        // 等价方案(任何浏览器中运行)
        /*var count = 0;
        for (var prop in items) {
            if (items.hasOwnProperty(prop))
                ++count;
        }
        return count;*/
    };
    // 返回一个包含集合中所有值的数组
    this.values = function () {
        return Object.keys(items);
        // 等价方案(任何浏览器中运行)
        /*var keys = [];
        for (var key in items) {
            keys.push(key);
        }
        return keys;*/
    };

    /*
    * 特殊方法
    * */
    // 并集
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
    // 交集
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
    // 差集
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
    // 子集
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