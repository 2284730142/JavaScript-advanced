abstract class Animal{
    constructor(){}
    abstract eat(food: string){}
}

// class Snake extends Animal{}

class Dog extends Animal{
    eat(food: string){
        console.log("这只狗正在吃"+food);
    }
}

class Cat extends Animal{
    eat(food: string){
        console.log("这只猫正在吃"+food);
    }
}

let dog = new Dog();
dog.eat('骨头');