"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useRotate = function () {
    var rotateCenter = (0, react_1.useRef)([0, 0]);
    var downPoint = (0, react_1.useRef)([0, 0]);
    var rotating = (0, react_1.useRef)(false);
    var currentDeg = (0, react_1.useRef)(0);
    var target = (0, react_1.useRef)(null);
    var normalize = (0, react_1.useCallback)(function (deg) {
        if (deg > 180) {
            deg = deg - 360;
        }
        else if (deg < -180) {
            deg = 360 + deg;
        }
        return deg;
    }, []);
    var getDeg = (0, react_1.useCallback)(function (vector) {
        //添加负数改为顺时针的角度
        var startDeg = -Math.atan2(-downPoint.current[1] + rotateCenter.current[1], downPoint.current[0] - rotateCenter.current[0]) * (180 / Math.PI);
        //添加负数改为顺时针角度
        var newDeg = -Math.atan2(-vector[1] + rotateCenter.current[1], vector[0] - rotateCenter.current[0]) * (180 / Math.PI);
        var delta = newDeg - startDeg;
        return normalize(delta);
    }, [normalize]);
    var setTransform = (0, react_1.useCallback)(function (deg) {
        target.current.style.transform = "rotate(".concat(deg, "deg)");
    }, []);
    var handleMouseDown = (0, react_1.useCallback)(function (e) {
        rotating.current = true;
        var dom = target.current;
        if (dom) {
            var _a = dom.getBoundingClientRect(), width = _a.width, height = _a.height, left = _a.left, top_1 = _a.top;
            downPoint.current = [e.clientX, e.clientY];
            rotateCenter.current = [left + width / 2, top_1 + height / 2];
            console.log('down', downPoint);
            console.log('rotate', rotateCenter);
        }
    }, []);
    var handleMouseMove = (0, react_1.useCallback)(function (e) {
        if (rotating.current) {
            setTransform(normalize(currentDeg.current + getDeg([e.clientX, e.clientY])));
        }
    }, [getDeg, normalize, setTransform]);
    var handleMouseStop = (0, react_1.useCallback)(function (e) {
        rotating.current = false;
        currentDeg.current = (normalize(currentDeg.current + getDeg([e.clientX, e.clientY])));
    }, [getDeg, normalize]);
    (0, react_1.useEffect)(function () {
        var dom = target.current;
        if (dom) {
            dom.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseStop);
        }
    }, [handleMouseDown, handleMouseMove, handleMouseStop]);
    return {
        target: target
    };
};
exports["default"] = useRotate;
