/*
* 这个还是看戏就好了，反正编译过后的代码和es5写法差不多
* */
class Dog {
    /*
    * class的所有属性必须在顶部全部声明，否则无法通过编译,这让类的创建更加规范；
    * 并且可以声明属性类型，如果给属性赋值的时候类型不正确也无法通过编译，当然，你也可以不声明类型或声明为any任何类型；
    * */
    hairColor: string;
    breed: string;
    age: number;
    runSpeed: string;
    // TS静态变量的声明就比较舒服了，在class的{}里面，保证了代码的干净
    static instanceNumber: number = 0;
    constructor(hairColor, breed, age) {
        this.hairColor = hairColor;
        this.breed = breed;
        this.age = age;
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
