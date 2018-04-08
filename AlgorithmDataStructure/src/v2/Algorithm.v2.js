/*
* 考虑利用闭包封装。
* 立即执行表达式最后的圆括号也可以写在里面更像一个整体。
* 开头的分号是为了防止在打包时出问题
* */
;(function (global, undefined) {
    'use strict';// 严格模式的习惯必须养成
    // 所有声明应放在上面
    var _global;
    // bind的ie6-8兼容
    Function.prototype.bind = Function.prototype.bind || function (context) {
        var that = this;
        return function () {
            return that.apply(context, arguments);
        }
    };

    // my code start
    var sortArray = function (arr) {
        // 公有变量
        this.value = arr;
        if (Object.prototype.toString.call(arr) !== '[object Array]') {
            this.length = 0;
        } else {
            this.length = arr.length;
        }
        // 私有方法
        this._swap = function (index1, index2) {
            var aux = this.value[index1];
            this.value[index1] = this.value[index2];
            this.value[index2] = aux;
        };
    };

    // 公有方法，给外部暴露的接口
    sortArray.prototype = {
        bubbleSort: function () {
            for (var i = 0; i < this.length; i++) {
                for (var j = 0; j < this.length - 1 - i; j++) {
                    if (this.value[j] > this.value[j + 1]) {
                        this._swap(j, j + 1);
                    }
                }
            }
            return this.value;
        },
        selectSort: function () {
            for (var i = 0; i < this.length - 1; i++) {
                var minIndex = i;
                for (var j = i; j < this.length; j++) {
                    if (this.value[j] < this.value[i]) {
                        minIndex = j;
                    }
                }
                if (i !== minIndex) {
                    this._swap(i, minIndex);
                }
            }
            return this.value;
        },
        insertSort: function () {
            var j = 0;
            var temp = 0;
            for (var i = 1; i < this.length; i++) {
                j = i;
                temp = this.value[i];
                while (j > 0 && this.value[j - 1] > temp) {
                    this.value[j] = this.value[j - 1];
                    j--;
                }
                this.value[j] = temp;
            }
            return this.value;
        },
        mergeSort: function () {
            function mergeSortRec(arr) {
                var length = arr.length;
                if (length === 1) {
                    return arr;
                }
                var mid = Math.floor(length / 2);
                var left = arr.slice(0, mid);
                var right = arr.slice(mid, length);
                return merge(mergeSortRec(left), mergeSortRec(right));
            }

            function merge(left, right) {
                var result = [];
                var il = 0;
                var ir = 0;
                while (il < left.length && ir < right.length) {
                    if (left[il] < right[ir]) {
                        result.push(left[il++]);
                    } else {
                        result.push(right[ir++]);
                    }
                }
                while (il < left.length) {
                    result.push(left[il++]);
                }
                while (ir < right.length) {
                    result.push(right[ir++]);
                }
                return result;
            }

            return mergeSortRec(this.value);
        },
        quickSort: function () {
            var swap = this._swap.bind(this);

            function quick(arr, left, right) {
                var index;
                if (arr.length > 1) {
                    index = partition(arr, left, right);
                    if (left < index - 1) {
                        quick(arr, left, index - 1);
                    }
                    if (index < right) {
                        quick(arr, index, right);
                    }
                }
                return arr;
            }

            function partition(arr, left, right) {
                var pivot = arr[Math.floor((right + left) / 2)];
                var i = left;
                var j = right;
                while (i <= j) {
                    while (arr[i] < pivot) {
                        i++;
                    }
                    while (arr[j] > pivot) {
                        j--;
                    }
                    if (i <= j) {
                        swap(i, j);
                        i++;
                        j--;
                    }
                }
                return i;
            }

            return quick(this.value, 0, this.length - 1);
        }
    };

    var searchArray = function (item, arr) {
        this.data = arr;
        this.search = item;
        if (Object.prototype.toString.call(arr) !== '[object Array]') {
            this.length = 0;
        } else {
            this.length = arr.length;
        }
    };

    searchArray.prototype = {
        /*
        * 线性查找用于确认位置，比较慢
        * */
        sequentialSearch: function () {
            for (var i = 0; i < this.data.length; i++) {
                if (this.search === this.data[i]) {
                    return i;
                }
            }
            return -1;
        },
        /*
        * 二分查找用于确认是否存在，比较快
        * */
        binarySearch: function () {
            var s = new sortArray(this.data);
            var arr = s.quickSort();
            var low = 0;
            var high = arr.length - 1;
            var mid;
            var element;
            while (low <= high) {
                mid = Math.floor((low + high) / 2);
                element = arr[mid];
                if (element < this.search) {
                    low = mid + 1;
                } else if (element > this.search) {
                    high = mid - 1;
                } else {
                    return true;
                }
            }
            return false;
        }
    };
    // my code end

    // 暴露对象给全局对象
    _global = (function () {
        // (0, eval)('this'):执行完以后是eval
        // 正常情况(非IE)下，可以直接使用eval()，但是在部分低版本的ie中，不可以直接运行eval，所以可以使用 (0,eval)
        // 间接调用计算出来的是一个值，而不是引用
        return this || (0, eval)('this');
    }());
    // 使用模块化的规范包装
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = sortArray;
        module.exports = searchArray;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return sortArray;
        });
        define(function () {
            return searchArray;
        });
    } else {
        !('sortArray' in _global) && (_global.sortArray = sortArray);
        !('searchArray' in _global) && (_global.searchArray = searchArray);
    }
}());



