"use strict";
exports.__esModule = true;
var React = require("react");
require("./Button.css");
var noop = function () { };
exports.Button = function (props) {
    var children = props.children, onClick = props.onClick, _a = props.disabled, disabled = _a === void 0 ? false : _a;
    var disabledclass = disabled ? 'Button_disabled' : '';
    return (<div className={"Button " + disabledclass} onClick={!disabled ? onClick : noop}>
            <span>{children}</span>
        </div>);
};
