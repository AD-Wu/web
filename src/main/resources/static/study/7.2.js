// 闭包是指有权访问另一个函数作用域中的变量的函数
/**
 * ()表示立即执行,需要给整个函数加上括号
 */
(function autoLog() {
    console.log("Auto:Hello World");
})();

(function (index) {
    let sum = 0;
    for (let i = 1; i <= index; ++i) {
        sum += i;
    }
    console.log("sum = " + sum);
})(10);
