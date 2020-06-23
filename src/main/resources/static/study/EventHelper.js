let EventHelper = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(element, type, handler);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    getButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                // 没有按下按钮
                case 0:
                // 按下了主鼠标按钮
                case 1:
                // 同时按下了主、次鼠标按钮
                case 3:
                // 同时按下了主、中间鼠标按钮
                case 5:
                // 同时按下了三个鼠标按钮
                case 7:
                    return 0;// 主
                // 按下了次鼠标按钮
                case 2:
                // 同时按下了次、中间鼠标按钮
                case 6:
                    return 2// 次
                // 按下了中间鼠标按钮
                case 4:
                    return 1;// 中间
            }
        }
    },
    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            // Firefox
            return -event.detail * 40;
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}