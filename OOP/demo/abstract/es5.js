/*
* 这是一个狗类：帕斯卡命名（pascal），也是构造函数
* */
function Dog(hairColor, breed, age) {
    /*
    * 属性：驼峰命名（camel）;
    * this指向被创造的对象（实例）;
    * 属性的话声明一定要放在构造函数的顶部，有必要的话声明一下属性类型;
    * */
    this.hairColor = hairColor;//str
    this.breed = breed;//str
    this.age = age;//num
    // 属性初始值可以不赋予，但一定能够要声明，方法内可以进行赋值
    this.runSpeed = null;
    Dog.instanceNumber++;
}

// 创建静态属性
Dog.instanceNumber = 0;

Dog.prototype.shout = function () {
    /*
    * 我们把方法追加到构造函数的prototype属性，而不是直接在构造函数里用this.shout = function(){};
    * 这样的好处是会让Dog创造的所有对象都共享一个方法,从而节约内存;
    * 一般来说属性在构造函数里赋予，方法在prototype里赋予;
    * */
    console.log('汪！汪！汪！我是一只' + this.age + '岁的' + this.hairColor + this.breed);
    //方法里通过this可以访问属性
};

Dog.prototype.run = function () {
    // 赋值
    this.runSpeed = '10m/s';
    console.log('吃我灰吧，哈哈！本狗的速度可是有' + this.runSpeed);
};

Dog.prototype.gnawBone = function () {
    console.log('这是本狗最幸福的时候');
};
// 为访问静态属性封装方法
Dog.prototype.getInstanceNumber = function () {
    return Dog.instanceNumber;
};

// 创建实例对象
var dog1 = new Dog('白色', '贵宾', 2);
// log: 1;虽然可以这样访问静态属性，并且还可以修改它，但坚决不推荐这样做
console.log(Dog.instanceNumber);
// log: 1;正确的做法！为什么要这样做，在封装一节会详细讲
console.log(dog1.getInstanceNumber());
var dog2 = new Dog('棕色', '泰迪', 1);
// log: 2;
console.log(dog2.getInstanceNumber());
var dog3 = new Dog('黑色', '土狗', 3);
// log: 3;
console.log(dog3.getInstanceNumber());