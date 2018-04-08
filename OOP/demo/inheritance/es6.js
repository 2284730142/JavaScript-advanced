class Animal {
    constructor(shoutVoice, speed) {
        this._shoutVoice = shoutVoice;//string
        this._speed = speed;//string
    }

    get speed() {
        return this._speed;
    }

    shout() {
        console.log(this._shoutVoice);
    }

    run() {
        console.log('嘿嘿，吃我灰吧！我的速度可是有' + this._speed);
    }
}

class Dog extends Animal {
    constructor() {
        //相当于Animal.call(this,'汪汪汪！','10m/s');
        super('汪汪汪！', '10m/s');
    }

    gnawBone() {
        console.log('这是本狗最幸福的时候');
    }

    run() {
        console.log('这是Dog类上的run方法，不是Animal类的');
        //相当于Animal.prototype.run.call(this);
        super.run();
    }
}

class PoodleDog extends Dog {
    constructor() {
        super();
        this._breed = 'poodle';
    }

    get breed() {
        return this._breed;
    }
}

let poodleDog = new PoodleDog();
console.log(poodleDog.breed);
console.log(poodleDog.speed);
poodleDog.shout();
poodleDog.run();
poodleDog.gnawBone();