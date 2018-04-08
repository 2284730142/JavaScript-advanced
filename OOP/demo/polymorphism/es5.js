function extend(subClass, superClass) {
    var o = function () {
        this.constructor = subClass;
    };

    o.prototype = superClass.prototype;

    subClass.prototype = new o();

    return subClass.prototype;
}

/*
* 多态：多种状态
* */
function Animal() {
}

var AnimalP = Animal.prototype;

AnimalP.eat = function (food) {
    console.log('这个动物正在吃' + food);
};

function Snake() {
}

// snake没有对eat方法重写，继承的父类eat()方法
var SnakeP = extend(Snake, Animal);

function Dog() {
}

var DogP = extend(Dog, Animal);
// 对eat()方法重写
DogP.eat = function (food) {
    console.log("这只狗正在吃" + food);
    // 也可以在这里通过 Animal.eat.call(this,food)调用父方法；
};

function Cat() {
}

var CatP = extend(Cat, Animal);

CatP.eat = function (food) {
    console.log("这只猫正在吃" + food);
};

var snake = new Snake();
snake.eat('老鼠');
var dog = new Dog();
dog.eat('骨头');
var cat = new Cat();
cat.eat('鱼');

/*
* 抽象：
* 如果希望子类一定要有某个方法，这样可以规范子类行为，那么就可以模拟抽象
* */

/*
AnimalP.eat = function (food) {
    // 定义抽象方法（虚函数），如果子类没有重写这个方法，在执行这方法的时候就会抛出错误
    throw '"' + this.constructor.name + "'类没有eat()方法";
};

function Snake() {
}

var SnakeP = extend(Snake, Animal);
var snake = new Snake();
snake.eat('老鼠');//throw:"Snake'类没有eat()方法
*/

/*
* 方法重载：
* ES5、ES6、typescipt都不支持语法上的方法重载；
* 多态的另一种实现方式；
* */
/*
function Dog() {
}

var DogP = Dog.prototype;
DogP.run = function (speed) {
    if (typeof speed === 'number') {
        this._runNumber(speed);
    } else if (typeof speed == 'string') {
        this._runString(speed);
    } else {
        throw '参数不匹配';
    }
};

DogP._runString = function (speed) {
    console.log('这只狗跑的速度有' + speed);
};

DogP._runNumber = function (speed) {
    console.log('这只狗跑的速度有' + speed + 'm/s');
};

var dog = new Dog();
dog.run(15);
dog.run('20KM/h');
dog.run([]);
*/
