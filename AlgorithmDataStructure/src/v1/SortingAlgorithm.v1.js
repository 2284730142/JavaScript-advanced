/*
        * 简单选择排序：给定数组arr，
        * 第一次从arr[1]-arr[n]选择最小的数据与arr[1]交换位置，
        * 第二次从arr[2]-arr[n]选择最小的数据与arr[2]交换位置，
        * 第i次从arr[i]-arr[n]选择最小的数据与arr[i]交换位置(i<n)。
        * */
function selectSort(arr) {
    var temp = 0;
    var length = arr.length;
    // 做第i次排序
    for (var i = 0; i < length - 1; i++) {
        var minIndex = i;
        // 第i次从arr[i]-arr[n]选择最小的数据与arr[i]交换位置(i<n)。
        for (var j = i; j < length; j++) {
            // 小的给标记
            if (arr[j] < arr[i]) {
                minIndex = j;
            }
        }
        // 交换位置(满足当前最小值不在标记上就交换)
        if (i !== minIndex) {
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

/*
* 冒泡排序：
* 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
* 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
* 针对所有的元素重复以上的步骤，除了最后一个。
* 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
* */
function bubbleSort(arr) {
    var temp = 0;
    var length = arr.length;
    for (var i = 0; i < length; i++) {
        // 从第二个开始比，一直比到最后一个
        for (var j = 0; j < length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

/*
* 插入排序：
* 将n个元素的数列分为已有序和无序两个部分，
* 每次处理就是将无序数列的第一个元素与有序数列的元素从后往前逐个进行比较，找出插入位置，将该元素插入到有序数列的合适位置中。
* 仅适用于量小于千的排序
* */
/* 太复杂了
function insertSort(arr) {
    // 有序
    var order = [arr[0]];
    // 无序
    var disorder = arr.splice(1, arr.length - 1);

    function insertSortRec(input) {

        var flag = null;
        for (var i = 0; i < order.length; i++) {
            // 无序第一个比有序的小就记录下标
            if (input.order[i] < input.disorder[0]) {
                flag = i;
            } else {
                break;
            }
        }

        // 下标没有值那就是第一个，有值就插入当前下标位置
        if (flag !== null) {
            input.order.splice(flag + 1, 0, input.disorder[0]);
        } else {
            input.order.unshift(input.disorder[0]);
        }

        // 删掉无序第一个
        input.disorder = input.disorder.splice(1, input.disorder.length - 1);

        if (input.disorder.length !== 0) {
            // 递归函数需要连续返回结果
            return insertSortRec({order: input.order, disorder: input.disorder});
        } else {
            return input.order;
        }
    }

    return insertSortRec({order: order, disorder: disorder});
}*/

// 上面的改进版本
function insertSort(arr) {
    var length = arr.length;
    var j = 0;
    var temp = 0;
    for (var i = 1; i < length; i++) {
        j = i;
        temp = arr[i];
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
}

/*
* 归并排序：
* 上面的性能都不咋地，不过这个归并的还是很不错滴。
* 一种分治算法，思想将原始数据分为较小的数组，直到每个小数组只有一个位置，
* 接着讲小数组归并成较大的数组，直到排序完毕的大数组
* */
function mergeSort(arr) {

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

    // 归并过程完成排序
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

    return mergeSortRec(arr);
}

/*
* 快速排序：使用分治的方法
* 从数组中间选择一项作为主元；
* 创建两个指针，左边一个指向数组第一项，右边一个指向数组最后一个项，
* 移动左指针找到一个比主元大的数，右指针找到比主元小的数，然后交换他们，
* 重复过程直到左指针超过右指针（划分操作）；
* 算法对划分后的小数组，重新执行之前两个步骤，直至排序完成
* */
function quickSort(arr) {
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
                var aux = arr[i];
                arr[i] = arr[j];
                arr[j] = aux;
                i++;
                j--;
            }
        }
    }

    return quick(arr, 0, arr.length - 1);
}

