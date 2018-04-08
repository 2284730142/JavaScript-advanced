class Animal {
    eat(food) {
        throw '"' + this.constructor.name + "'类没有eat()方法";
    }
}

class Snake extends Animal {
}

class Dog extends Animal {
    eat(food) {
        console.log("这只狗正在吃" + food);
    }
}

class Cat extends Animal {
    eat(food) {
        console.log("这只猫正在吃" + food);
    }
}

/*let snake = new Snake();
snake.eat('老鼠');*/
let dog = new Dog();
dog.eat('骨头');
let cat = new Cat();
cat.eat('鱼');