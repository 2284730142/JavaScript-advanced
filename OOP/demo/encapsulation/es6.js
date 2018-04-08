class Dog {
    constructor(hairColor, breed, age) {
        this.hairColor = hairColor;//str
        this._breed = breed;//str
        this.age = age;//num
        this._init();
        Dog.instanceNumber++;
    }

    _init() {
        this.hairColor = '白色';
        this.age = 2;
        this._breed = '贵宾';
    };

    get breed() {
        // 通过getter实现，只是es6写起来简洁
        console.log('监听到了有人调用这个getBreed()接口');
        return this._breed;
    }

    set breed(breed) {
        // 跟ES5一样，如果不设置的话默认breed无法被修改，而且不会报错
        console.log('监听到了有人调用这个set breed接口');
        this._breed = breed;
        return this;
    }

    gnawBone() {
        console.log('这是本狗最幸福的时候');
        return this;
    };

    getInstanceNumber() {
        return Dog.instanceNumber;
    };
}
Dog.instanceNumber = 0;
var dog = new Dog();
console.log(dog.breed);
dog.breed = '土狗';
console.log(dog.breed);