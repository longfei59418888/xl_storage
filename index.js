"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = _get;
exports.remove = _remove;
exports.default = exports.clear = exports.set = void 0;

function _instanceof(left, right) {
    if (
        right != null &&
        typeof Symbol !== "undefined" &&
        right[Symbol.hasInstance]
    ) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var moduleName = "____MODULE___"; // 清除过期的 storage

Object.keys(localStorage).forEach(function(item) {
    return _get(item);
}); // 默认三个月

var _set = function set(attr) {
    var data =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var timeOut =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (data === null || data === "") return;
    if (timeOut !== null) timeOut = new Date().getTime() + timeOut * 1000;
    data = JSON.stringify({
        data: data,
        timeOut: timeOut
    });
    localStorage.setItem(attr, data);
};

exports.set = _set;

function _get(attr) {
    var data = localStorage.getItem(attr);
    if (data === null || data === "") return null;

    try {
        data = JSON.parse(data);
        var now = new Date().getTime();

        if (now > data.timeOut && data.timeOut !== null) {
            _remove(attr);

            return null;
        }

        return data.data;
    } catch (e) {
        return null;
    }
}

function _remove(attr) {
    localStorage.removeItem(attr);
}

var clear = function clear() {
    localStorage.clear();
};

exports.clear = clear;

var Storages =
    /*#__PURE__*/
    (function() {
        function Storages(prefixName) {
            var _this = this;

            _classCallCheck(this, Storages);

            _defineProperty(this, "clear", function() {
                Object.keys(localStorage).forEach(function(item) {
                    if (new RegExp("^".concat(_this.prefixName)).test(item)) {
                        _remove(item);
                    }
                });
            });

            this.prefixName = "".concat(moduleName + prefixName, "___");
        }

        _createClass(Storages, [
            {
                key: "get",
                value: function get(attr) {
                    return _get("".concat(this.prefixName + attr));
                }
            },
            {
                key: "set",
                value: function set(attr) {
                    var data =
                        arguments.length > 1 && arguments[1] !== undefined
                            ? arguments[1]
                            : null;
                    var timeOut =
                        arguments.length > 2 && arguments[2] !== undefined
                            ? arguments[2]
                            : null;
                    attr = "".concat(this.prefixName + attr);

                    _set(attr, data, timeOut);
                }
            },
            {
                key: "remove",
                value: function remove(attr) {
                    attr = "".concat(this.prefixName + attr);

                    _remove(attr);
                }
            }
        ]);

        return Storages;
    })();

var _default = Storages;
exports.default = _default;
