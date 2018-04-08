class Dog {
    public hairColor: string;
    readonly age: number;//可声明只读属性
    private _breed: string;//虽然声明了private，但还是建议属性名加_以区分
    static instanceNumber: number = 0;//静态属性
    constructor(){
        this._init();
        Dog.instanceNumber++;
    }
    private _init(){
        this.hairColor = '白色';
        //this.age = 2;
        this._breed = '贵宾';
    }
    get breed(){
        console.log('监听到了有人调用这个get breed接口');
        return this._breed;
    }
    set breed(breed){
        console.log('监听到了有人调用这个set breed接口');
        this._breed = breed;
    }
    public gnawBone() {
        console.log('这是本狗最幸福的时候');
        return this;
    }
    public getInstanceNumber() {
        return Dog.instanceNumber;
    }
}
let dog = new Dog();
dog.breed = '土狗';
console.log(dog.breed);
console.log(dog.age);
//console.log(dog._breed);
//dog._init();