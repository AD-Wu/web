function convertToArray(nodes) {
    let array = null;
    try {
        array = Array.prototype.slice.call(nodes, 0);// 针对非IE浏览器
    } catch (e) {
        array = [];
        for (let i = 0, len = nodes.length; i < len; ++i) {
            array.push(nodes[i]);
        }
    }
    return array;
}