function Dog() {
    // 公有属性
    this.hairColor = null;
    this.age = null;
    // 私有属性
    this._breed = null;
    this._init();
    // 属性的初始化最好放一个私有方法里，构造函数最好只用来声明类的属性和调用方法
    Dog.instanceNumber++;
}

// 静态属性
Dog.instanceNumber = 0;
// 私有方法，类的内部调用
Dog.prototype._init = function () {
    this.hairColor = '白色';
    this.age = 2;
    this._breed = '贵宾';
};
// 公有方法:获取属性接口
Dog.prototype.getBreed = function () {
    console.log('监听到了有人调用这个getBreed()接口');
    return this._breed;
};
// 公有方法:设置属性的接口
Dog.prototype.setBreed = function (breed) {
    this._breed = breed;
    // 注意这里返回了this,那么可以在此进行链式调用（原因：只要公有方法没有返回值都建议返回this）
    // （另一个原因：链式调用写起来不方便么？）
    return this;
};
// 公有方法：对外暴露的行为方法
Dog.prototype.gnawBone = function () {
    console.log('这是本狗最幸福的时候');
    return this;
};
// 公有方法：对外暴露静态属性获取
Dog.prototype.getInstanceNumber = function () {
    //也可以this.constructor.instanceNumber
    return Dog.instanceNumber;
};

var dog = new Dog();
console.log(dog.getBreed());
var dogBreed = dog.setBreed('土狗').gnawBone().getBreed();
console.log(dogBreed);
console.log(dog);