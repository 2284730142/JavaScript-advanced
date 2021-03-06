/*
* es6创建类的方法很简单
* */
class Dog {
    // 这个类的构造函数
    constructor(hairColor, breed, age) {
        this.hairColor = hairColor;//str
        this.breed = breed;//str
        this.age = age;//num
        this.runSpeed = null;
        Dog.instanceNumber++;
    }

    shout() {
        console.log('汪！汪！汪！我是一只' + this.age + '岁的' + this.hairColor + this.breed);
    }

    run() {
        this.runSpeed = '10m/s';
        console.log('吃我灰吧，哈哈！本狗的速度可是有' + this.runSpeed);
    }

    gnawBone() {
        console.log('这是本狗最幸福的时候');
    }

    getInstanceNumber() {
        return Dog.instanceNumber;
    }
}
// es6的静态属性只能这样写，es7可以直接在类中写了
Dog.instanceNumber = 0;
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