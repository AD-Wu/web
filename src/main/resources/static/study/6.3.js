// -------------------------- 原型链继承 ----------------------------
/**
 * 使用原型链实现继承
 */
function $SuperType() {
    this.colors = ["green", "red", "yellow"];
}

function $SubType() {
}

// 原型链模式实现继承
$SubType.prototype = new $SuperType();

let $sub1 = new $SubType();
$sub1.colors.push("black");
console.log("原型链模式：" + $sub1.colors)

let $sub2 = new $SubType();
console.log("原型链模式：" + $sub2.colors);
console.log("======================================\n");

// 总结：
// 原型链优点：方法可以公用，不同实例之间不会产生不同的方法对象
// 原型链缺点：属性不能公用，不同示例间对属性对修改会互相影响

// -------------------------- 构造函数继承 ----------------------------

/**
 * -使用构造函数进行继承
 */

function SuperType() {
    this.colors = ["red", "black", "blue"];
}

function SubType() {
    // 继承了SuperType，借用超类构造函数，也可以使用apply
    SuperType.call(this);
}

let sub1 = new SubType();
sub1.colors.push("green");
console.log("构造函数模式：" + sub1.colors);

let sub2 = new SubType();
console.log("构造函数模式：" + sub2.colors);


/**
 * 构造函数传参
 * @param name
 * @constructor
 */
function SuperType1(name) {
    this.name = name;
}

function SubType1() {
    SuperType1.call(this, "AD");
    // 实例属性
    this.age = 29;
}

let son = new SubType1();
console.log("借用构造函：" + son.name);
console.log("借用构造函数：" + son.age);

/**
 * 在超类对原型中定义方法，通过构造函数继承，观察方法是否对子类可见
 * @param name
 * @constructor
 */
function SuperType2(name) {
    this.name = name;
}

SuperType2.prototype.sayHello = function () {
    return "Hello world";
}

function SubType2(age) {
    SuperType2.call(this, "Sunday");
    this.age = age;
}

let son2 = new SubType2(3);
// console.log(son2.sayHello()); 会抛出异常：son2.sayHello is not a function
console.log("构造函数继承-测试超类中对原型方法是否对子类可：" + son2.name);
console.log("构造函数继承-测试超类中对原型方法是否对子类可见：" + son2.age);
console.log("======================================\n");

/**
 *-总结：
 *-构造函数继承：
 *  -优点：实例之间属性不会共用，对属性对修改不会互相影响
 *  -缺点：超类原型中的方法，对子类是不可见的。如果用构造函数实现继承，在构造函数中定义方法，
 *        函数无法复用
 */

// ------------------------- 组合继承 -------------------------
function SuperClass(name) {
    this.name = name;
    this.colors = ["red", "green", "black"];
}

SuperClass.prototype.sayName = function () {
    return this.name;
}

function SubClass(name, age) {
    // 继承属性
    SuperClass.call(this, name);// 第二次调用父类构造函数，子类实例中继承了name、colors属性，并重写了原型中到同名属性，并赋值
    this.age = age;
}

// 继承方法
SubClass.prototype = new SuperClass();// 第一次调用父类构造函数，子类原型中继承了name、colors属性，但此时都是undefined，未赋值
// 扩展子类方法
SubClass.prototype.sayAge = function () {
    return this.age;
}
// 测试
let subClass = new SubClass("AD-1", 5);
subClass.colors.push("yellow");
console.log("组合继承：name=" + subClass.sayName());
console.log("组合继承：age=" + subClass.sayAge());
console.log("组合继承：colors=" + subClass.colors);
console.log("-----------------------------------");

let subClass2 = new SubClass("AD-2", 6);
console.log("组合继承：name=" + subClass2.sayName());
console.log("组合继承：age=" + subClass2.sayAge());
console.log("组合继承：colors=" + subClass2.colors);
console.log("======================================\n");

/**
 * 组合继承总结：
 *  - 优点：构造函数继承属性，原型链继承方法，实现了实例之间属性不互相影响，方法公用的特点
 *  - 缺点：出现了2次调用（不必要），影响效率
 */

// ------------------------- 原型式继承 -------------------------
function object(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

let person = {
    name: "AD",
    friends: ["Joy", "Lucas", "Allen"]

}
let p1 = object(person);
p1.name = "AD-1";
p1.friends.push("Linda");
console.log("原型式继承：p1.name=" + p1.name);
console.log("原型式继承：p1.friends=" + p1.friends);
console.log("原型式继承：person.name=" + person.name);
console.log("原型式继承：person.friends=" + person.friends);

let p2 = object(person);
p2.name = "AD-2";
p2.friends.push("Ella");
console.log("原型式继承：p2.name=" + p2.name);
console.log("原型式继承：p2.friends=" + p2.friends);
console.log("原型式继承：person.name=" + person.name);
console.log("原型式继承：person.friends=" + person.friends);
console.log("\"======================================\n")

/**
 * 原型式继承总结：类似原型链继承，实例之间的属性（引用）会互相影响，比如数组
 */

// ------------------------- 寄生式组合继承 -------------------------
function getPrototype(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

/**
 * - 创建父类的原型副本，将其副本赋值给子类原型，避免通过创建父类对象实例来赋值子类原型</br>
 * - 不推荐: subType.prototype = new SuperType();
 * @param subType
 * @param superType
 */
function inheritPrototype(subType, superType) {
    // 创建对象，作为子类的基础对象
    let prototype = getPrototype(superType.prototype);
    // 原型重写之后，会失去默认到constructor属性
    prototype.constructor = subType;
    // 将创建的父类副本赋值给子类原型
    subType.prototype = prototype;
}

// 父类构造函数，用构造函数定义属性
function SuperUser(name) {
    this.name = name;
    this.friends = ["Joy", "Ella", "Allen"];
}

// 用原型链的方式扩展父类方法，达到方法共用，避免浪费内存空间
SuperUser.prototype.getName = function () {
    return this.name;
}

function SubUser(name, age) {
    // 调用父类构造函数，实现属性继承
    SuperUser.call(this, name);
    // 扩展属性
    this.age = age;
}

// 继承父类，不再创建父类原型对象实例来扩展子类，会将父类到属性添加到子类原型中，这是不必要的
inheritPrototype(SubUser, SuperUser);

SubUser.prototype.getAge = function () {
    return this.age;
}

let user1 = new SubUser("AD-1", 1);
user1.friends.push("Lucas");
console.log("寄生式组合继承：name=" + user1.getName());
console.log("寄生式组合继承：friends=" + user1.friends);
console.log("-----------------------------------");

let user2 = new SubUser("AD-2", 2);
user2.friends.push("TheShy");
console.log("寄生式组合继承：name=" + user2.getName());
console.log("寄生式组合继承：friends=" + user2.friends);

/**
 * 寄生式组合继承总结：
 * - 采用构造函数继承属性，实例之间对属性（包括引用属性）的修改不会互相影响
 * - 不直接采用创建父类对象对子类原型进行重写，父类中的构造函数会包含属性，会导致子类原型中也包含该属性
 * - 创建父类原型副本，将其赋值给子类原型
 */