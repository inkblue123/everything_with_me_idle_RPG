// ���������

class BaseClass {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

// ��������A

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

// ��������B

const MixinB = {
    sayGoodbye() {
        console.log('Goodbye from MixinB');
    },

    describe() {
        console.log('MixinB provides different functionality.');
    },
};

// ����һ���������ϲ������Ĺ���

function applyMixins(targetClass, ...mixins) {
    mixins.forEach((mixin) => {
        Object.assign(targetClass.prototype, mixin);
    });
}

// �������A��B�Ĺ�����ӵ���������
applyMixins(BaseClass, MixinA, MixinB);

// ����һ���µ�ʵ�����������书��

const instance = new BaseClass('John Doe');

instance.greet(); // ���: Hello, my name is John Doe

instance.sayHello(); // ���: Hello from MixinA

instance.sayGoodbye(); // ���: Goodbye from MixinB

instance.describe(); // ���: MixinB provides different functionality.
instance.say_AAAA(); // ���: MixinB provides different functionality.
