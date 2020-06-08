// 利用闭包创建私有变量和私有函数（在构造函数中创建的变量都是实例变量）
function User(name) {
    // 私有变量，只能通过特权方法访问
    let age = 1;
    // 公有变量，可以直接访问
    this.publicAge = 2;

    // 公有方法必须使用函数表达式，函数声明只能创建局部函数（私有函数）
    this.getName = function () {
        //error:undefined 不能这么写，外部在调用getName()方法时，当前对象是window，并没有name属性
        // return this.name;
        // 局部变量
        return name;
    }
    this.setName = function (value) {
        // 不能这么写，外部函数调用setName()时，this是window对象，window环境中并未定义name属性，会无法设置name的属性值
        // this.name = value;
        name = value;
    }

    this.getAge = function () {
        return age;
    }
    this.setAge = function (value) {
        age = value;
    }

    // 特权方法：有权访问私有变量和私有函数的方法称为特权方法
    this.accessPrivateMethod = function () {
        privateMethod();
    }

    // 私有函数
    function privateMethod() {
        console.log("access private method by public method,the age is:" + age);
    }

    // 函数声明只能创建局部函数，这是私有函数，外部不能访问。只能使用函数表达式
    // function getName() {
    //     return name;
    // }
    // function setName(value) {
    //     name = value;
    // }
}

var user = new User("Joy");
console.log(user.getName());
user.setName("Ella");
console.log(user.getName());
console.log("private field:" + user.privateAge); // undefine,只能通过特权方法访问
console.log("public field:" + user.publicAge)
console.log(user.getAge());
user.accessPrivateMethod();
console.log("-----------------------------------");
var user1 = new User("Lucas");
user1.setAge(2);
console.log("Joy age = " + user.getAge());
console.log("Lucas age = " + user1.getAge());

user.publicAge = 5;
console.log(user.publicAge);
console.log(user1.publicAge);

console.log("===================================");

/**
 * 总结：
 *  - 缺点：每个实例都会创建相同的函数对象
 */

// ---------------------- 静态私有变量 -----------------------
(function () {
    // 静态变量，所有实例共享(在块级作用域中创建，并非在构造函数中创建)
    let name = "";
    // 定义构造函数时，并没有加上this，表示name是所有实例共享，即静态变量
    Person = function (value, age) {
        // 静态变量
        name = value;
        // 实例变量
        this.age = age;
    }
    // 返回静态变量，如果是实例变量，则需要在构造函数中加上this关键字，此处应返回：return this.name
    Person.prototype.getName = function () {
        return name;
    }
    // 设置静态变量，实例变量：this.name = value;
    Person.prototype.setName = function (value) {
        name = value;
    }

    Person.prototype.getAge = function () {
        return this.age;
    }
    // 设置静态变量，实例变量：this.name = value;
    Person.prototype.setAge = function (value) {
        this.age = value;
    }

})();
let p = new Person("AD", 1);
console.log("p.name=" + p.getName() + " ,p.age=" + p.getAge());

console.log("After:");
let p1 = new Person("Lucas", 2);
console.log("p.name=" + p.getName() + " ,p.age=" + p.getAge());// Lucas
console.log("p1.name=" + p1.getName() + " ,p1.age=" + p1.getAge());// Lucas
console.log("===================================");
// --------------------------- 单例模式 -------------------------------
/**
 * - JavaScript是以字面量的方式来创建单例模式的
 */
let demo = {
    name: "",
    method: function () {
        // some code
    }
}
// 模块模式为单例添加私有变量和私有方法使其得到增强
let singleton = function () {
    // 私有变量
    let privateVariable = 1;

    // 私有函数
    function privateMethod() {
        return false;
    }

    // 对象字面量作为函数的返回值（单例）
    return {
        publicProperty: true,
        publicMethod: function () {
            privateVariable++;
            return privateMethod();
        }
    }
}();// 闭包立即执行返回字面量对象，singleton无法使用new关键字进行创建对象

console.log("单例模式，公有属性:" + singleton.publicProperty);
console.log("单例模式，私有属性:" + singleton.publicMethod());
console.log("=====================================")

// ------------------------- 增强模块模式 ------------------------------
/**
 *  - 增强模块模式实现单例，适用于单例必须是某种类型的实例
 */
let Singleton = function () {
    let privateField = 10;

    function privateMethod() {
        return "private method";
    }

    let o = new User("AD");
    o.publicField = "public field";
    o.publicMethod = function () {
        privateField++;
        return privateMethod();
    }
    return o;
}();
console.log("增强模块模式-单例：name=" + Singleton.getName());
console.log("增强模块模式-单例：age=" + Singleton.getAge());
console.log("增强模块模式-单例：publicField=" + Singleton.publicField);
console.log("增强模块模式-单例：publicMethod=" + Singleton.publicMethod());