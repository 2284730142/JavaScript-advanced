/*
        * 顺序搜索：效率最低
        * */
function sequentialSearch(item, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (item === arr[i]) {
            return i;
        }
    }
    return -1;
}

/*
* 二分搜索：
* 选择数组中间值
* 如果是待查找则结束，
* 不是，但比选中的小那么在左边的数组继续，或者比选中大就在右边的数组继续
* */
function binarySearch(item, arr) {
    arr.sort(function (a, b) {
        return a > b;
    });
    var low = 0;
    var high = arr.length - 1;
    var mid;
    var element;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        element = arr[mid];
        if (element < item) {
            low = mid + 1;
        } else if (element > item) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}