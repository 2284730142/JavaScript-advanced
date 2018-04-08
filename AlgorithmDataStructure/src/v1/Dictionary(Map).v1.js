/*
       * 字典（map类）
       * */
function Dictionary() {
    var items = {};
    // 向字典中添加新元素
    this.set = function (key, value) {
        items[key] = value;
    };
    // 通过键值来从字典中移除相应的元素
    this.remove = function (key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };
    // 通过键值判断某个元素是否存在于字典中
    this.has = function (key) {
        return key in items;
    };
    // 通过键值查找特定的数值并返回
    this.get = function (key) {
        return this.has(key) ? items[key] : undefined;
    };
    // 将这个字典数据清除
    this.clear = function () {
        items = {};
    };
    // 返回字典所包含元素数量
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
    // 将字典所包含的键名以数组形式返回
    this.keys = function () {
        return Object.keys(items);
        // 等价方案(任何浏览器中运行)
        /*var keys = [];
        for (var key in items) {
            keys.push(key);
        }
        return keys;*/
    };
    // 将字典所包含的数据以数组形式返回
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