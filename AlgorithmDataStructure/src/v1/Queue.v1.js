/*
        * 队列（ES5）
        * */
function Queue() {
    var items = [];
    // 队列尾部添加项
    this.enqueue = function (element) {
        items.push(element);
    };
    // 移除队列第一个元素
    this.dequeue = function () {
        return items.shift();
    };
    // 返回队列第一个元素
    this.front = function () {
        return items[0];
    };
    // 判断队列是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };
    // 清空队列
    this.clear = function () {
        items = [];
    };
    // 返回队列大小
    this.size = function () {
        return items.length;
    };
    // 以字符串形式打印项
    this.print = function () {
        console.log(items.toString());
    }
}

/*
* 队列应用：击鼓传花
* 参数：
* nameList[准备匹配的数据]，num[每次传多少]
* */
function hotPotato(nameList, num) {
    var queue = new Queue();

    for (var i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]);
    }

    var eliminated = '';
    while (queue.size() > 1) {
        for (var j = 0; j < num; j++) {
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();
    }

    return queue.dequeue();
}