var Dog = (function () {
    function Dog() {
        this._init();
        Dog.instanceNumber++;
    }
    Dog.prototype._init = function () {
        this.hairColor = '白色';
        //this.age = 2;
        this._breed = '贵宾';
    };
    Object.defineProperty(Dog.prototype, "breed", {
        get: function () {
            console.log('监听到了有人调用这个get breed接口');
            return this._breed;
        },
        set: function (breed) {
            console.log('监听到了有人调用这个set breed接口');
            this._breed = breed;
        },
        enumerable: true,
        configurable: true
    });
    Dog.prototype.gnawBone = function () {
        console.log('这是本狗最幸福的时候');
        return this;
    };
    Dog.prototype.getInstanceNumber = function () {
        return Dog.instanceNumber;
    };
    Dog.instanceNumber = 0; //静态属性
    return Dog;
}());
var dog = new Dog();
dog.breed = '土狗';
console.log(dog.breed);
console.log(dog.age);
//console.log(dog._breed);
//dog._init(); 
