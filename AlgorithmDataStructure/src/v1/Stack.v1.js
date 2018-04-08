/*
        * 栈（ES5）
        * */
function Stack() {
    var items = [];
    // 向栈末尾加入值
    this.push = function (element) {
        items.push(element);
    };
    // 从栈末尾删除值
    this.pop = function () {
        return items.pop();
    };
    // 返回栈最后一位
    this.peek = function () {
        return items[items.length - 1];
    };
    // 判断栈是否清空
    this.isEmpty = function () {
        return items.length === 0;
    };
    // 得到栈长度
    this.size = function () {
        return items.length;
    };
    // 清空栈
    this.clear = function () {
        items = [];
    };
    // 打印栈
    this.print = function () {
        console.log(items.toString());
    };
}

/*
* 栈应用：十进制转换
* 参数：
* decNumber[准备转换的数组]
* base[转换的基准，2/8/16]
* */
function baseConverter(decNumber, base) {
    var remStack = new Stack();
    var rem;
    var baseString = '';
    var digits = '0123456789ABCDEF';

    while (decNumber > 0) {
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];
    }

    return baseString;
}

/*
* 栈应用：括号匹配（‘同样可以用于判断类回文的东西’）
* 参数：
* input[准备匹配的数据]
* */
function braceMatching(input) {
    var stuck = new Stack();
    for (var i = 0; i < input.length; i++) {
        var temp = input[i];
        switch (temp) {
            case ')':
                if (!stuck.isEmpty() && stuck.pop() === '(') {
                    break;
                } else {
                    return false;
                }
            case ']':
                if (!stuck.isEmpty() && stuck.pop() === '[') {
                    break;
                } else {
                    return false;
                }
            case '}':
                if (!stuck.isEmpty() && stuck.pop() === '{') {
                    break;
                } else {
                    return false;
                }
            default:
                stuck.push(temp);
                break;
        }
    }

    return stuck.isEmpty();
}

/*
* 栈应用：迷宫求解
* 参数：
* maze[迷宫]
* */