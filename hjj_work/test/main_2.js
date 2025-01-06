// 定义基础类

class BaseClass {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

// 定义混合类A

const MixinA = {
    AAAAA: '',
    sayHello() {
        console.log('Hello from MixinA');
    },

    describe() {
        console.log('MixinA provides additional functionality.');
    },
    say_AAAA() {
        console.log(AAAAA);
    },
};

// 定义混合类B

const MixinB = {
    sayGoodbye() {
        console.log('Goodbye from MixinB');
    },

    describe() {
        console.log('MixinB provides different functionality.');
    },
};

// 创建一个函数来合并混合类的功能

function applyMixins(targetClass, ...mixins) {
    mixins.forEach((mixin) => {
        Object.assign(targetClass.prototype, mixin);
    });
}

// 将混合类A和B的功能添加到基础类中
applyMixins(BaseClass, MixinA, MixinB);

// 创建一个新的实例，并测试其功能

const instance = new BaseClass('John Doe');

instance.greet(); // 输出: Hello, my name is John Doe

instance.sayHello(); // 输出: Hello from MixinA

instance.sayGoodbye(); // 输出: Goodbye from MixinB

instance.describe(); // 输出: MixinB provides different functionality.
instance.say_AAAA(); // 输出: MixinB provides different functionality.
