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
