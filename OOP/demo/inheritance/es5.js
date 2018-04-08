/*
* 继承在es5极为麻烦，因为es5需要用原型链来模拟
* 继承的次数不应过多，否则子类一不小心就把父类的属性方法给覆盖了；
* 我们可以把继承的对象作为成员属性，即组合,尽量少用继承，多用组合；
* 父类的属性和方法最好别太多，过多也容易被子类覆盖，可以抽象成一个对象来管理过多的属性和方法。
* 继承增加了耦合，所以父类封装性一定要好，尽量降低与子类的耦合，
* 父类的设计要有前瞻性，具备一定的扩展能力，你也不希望今后修改父类的时候，再去修改所有的子类吧？
* 父类尽量只定义方法，不定义属性，即构造函数最好是空函数；
* */

/*
* subClass:子类（派生类）
* superClass：父类（超类）
* extend函数让subClass继承superClass的原型方法，并返回subClass的原型；
* ES6的extends也是通过这种方式实现的
* */
function extend(subClass, superClass) {
    var o = function () {
        this.constructor = subClass;
    };

    o.prototype = superClass.prototype;

    subClass.prototype = new o();

    return subClass.prototype;
}

function Animal(shoutVoice, speed) {
    this._shoutVoice = shoutVoice;// string
    this._speed = speed;// string
}

Animal.prototype.getSpeed = function () {
    return this._speed;
};

Animal.prototype.shout = function () {
    console.log(this._shoutVoice);
};

Animal.prototype.run = function () {
    console.log('嘿嘿，吃我灰吧！我的速度可是有' + this._speed);
};

function Dog() {
    //实现继承：调用Animal的构造函数，继承Animal类的属性，第一个参数必须是this；
    Animal.call(this, '汪汪汪', '10m/s');
}

//接口继承：extends函数让Dog类继承Animal类的的原型方法并返回Dog的新的原型prototype;
var DogP = extend(Dog, Animal);
// 可以继续给的Dog类的prototype添加方法
DogP.gnawBone = function() {
    console.log('这是本狗最幸福的时候');
};
// 也可以覆盖父类的方法
DogP.run = function(){
    console.log('这是Dog类上的run方法，不是Animal类的');
    // 虽然覆盖掉了，但实际上Animal类的run方法还在，也可以通过这种方式访问父类的方法,可以了解一下
    Animal.prototype.run.call(this);
};

var dog = new Dog();
console.log(dog.getSpeed());
dog.shout();
dog.run();
dog.gnawBone();

function Snake() {
    Animal.call(this,'嘶！嘶！嘶！','5m/s');
}

var SnakeP = extend(Snake,Animal);

function PoodleDog(){
    Dog.call(this);
    this._breed = 'poodle';
}

var PoodleDogP = extend(PoodleDog,Dog);




