// 在浏览器的环境下测试任何对象的某个特性是否存在
function existMethod(object, field) {
    let prop = typeof object[field];
    console.log("type is : " + prop);
    return prop === 'function' || prop === 'unknow' || (!!(prop === 'object' && object[prop]));
}

let person = {
    name: "AD",
    printBirthday: function () {
        console.log(Date());
    }
}

console.log(existMethod(person, "name"));
console.log(existMethod(person, "printBirthday"));