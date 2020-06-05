// 利用闭包创建私有变量和私有函数
function User(name) {
    let age = 1;
    // 公有方法必须使用函数表达式，函数声明只能创建局部函数（私有函数）
    this.getName = function () {
        //error:undefined 不能这么写，外部在调用getName()方法时，当前对象时window，并没有name属性
        // return this.name;
        return name;
    }
    this.setName = function (value) {
        // 不能这么写，外部函数调用setName()时，this是window对象，window环境中并未定义name属性，会无法设置name的属性值
        // this.name = value;
        name = value;
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
console.log(user.age); // undefine,只能通过特权方法访问
user.accessPrivateMethod();
console.log("-----------------------------------");

/**
 * 总结：
 *  - 缺点：每个实例都会创建相同的函数对象
 */

// ---------------------- 静态私有变量 -----------------------
(function () {
    // 静态变量，所有实例共享
    let name = "";
    Person = function (value) {
        name = value;
    }
    Person.prototype.getName = function () {
        return name;
    }
    Person.prototype.setName = function (value) {
        name = value;
    }
})();
var p = new Person("AD");
console.log(p.getName())
p.setName("Allen");
console.log(p.getName());

var p1 = new Person("Lucas");
console.log(p.getName());// Lucas
console.log(p1.getName());// Lucas