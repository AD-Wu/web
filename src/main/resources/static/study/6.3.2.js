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
}

SuperClass.prototype.sayHello = function () {
    return "Hello World";
}

function SubClass(age) {
    SuperClass.call(this, "Sunday");
    this.age = age;
}

SubClass.prototype = new SuperClass();
let subClass = new SubClass(5);
console.log("组合继承" + subClass.name);
console.log("组合继承" + subClass.age);
console.log("组合继承" + subClass.sayHello());
