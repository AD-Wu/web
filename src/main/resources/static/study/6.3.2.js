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

var $sub1 = new $SubType();
$sub1.colors.push("black");
console.log("原型链模式：" + $sub1.colors)

var $sub2 = new $SubType();
console.log("原型链模式：" + $sub2.colors);


/**
 * -使用构造函数进行继承
 * -原型链继承存在耦合问题，对象对属性到改变会影响到其它实例
 */

function SuperType() {
    this.colors = ["red", "black", "blue"];
}

function SubType() {
    // 继承了SuperType，借调超类构造函数，也可以使用apply
    SuperType.call(this);
}

var sub1 = new SubType();
sub1.colors.push("green");
console.log("构造函数模式：" + sub1.colors);

var sub2 = new SubType();
console.log("构造函数模式：" + sub2.colors);
