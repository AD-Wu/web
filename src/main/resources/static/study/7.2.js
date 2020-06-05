// 闭包是指有权访问另一个函数作用域中的变量的函数
/**
 * ()表示立即执行,需要给整个函数加上括号
 */
(function autoLog() {
    console.log("Auto:Hello World");
})();

(function (index) {
    let sum = 0;
    /**
     * - 要注意var和let的区别，var表示全局作用域变量，let是局部作用域变量
     * - 建议使用lei
     */

    for (let i = 1; i <= index; ++i) {
        sum += i;
    }
    // console.log(i); error:i undefined。如果使用var则可以
    console.log("use let,sum = " + sum);
})(10);

/**
 * 不使用关键字，用闭包模仿块级作用域
 */
(function calculator(max) {
    var sum = 0;
    // 尽量不要使用var定义变量，var的作用域为全局，在for循环的作用域外仍然可以访问
    for (var i = 1; i <= max; ++i) {
        sum += i;
    }
    console.log("use var,i=" + i);
    console.log("use var,sum=" + sum);
})(10);

(function calculator(max) {
    var sum = 0;
    // 在for循环的外部插入私有作用域，在匿名函数中定义的任何变量，都会在执行结束后销毁
    (function () {
        for (var i = 1; i <= max; ++i) {
            sum += i;
        }
    })();
    // console.log("使用闭包模拟块级作用域，i=" + i); error: i is not defined
    console.log("使用闭包模拟块级作用域，sum=" + sum);
})(10);