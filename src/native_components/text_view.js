var virt = require("virt"),
    some = require("some"),
    isNotPrimitive = require("./is_not_primitive");


var View = virt.View,
    Component = virt.Component,
    TextViewPrototype;


virt.registerNativeComponent("TextView", TextView);


function TextView(props, children, context) {

    Component.call(this, props, children, context);

    if (process.env.NODE_ENV !== "production") {
        if (some(children, isNotPrimitive)) {
            throw new Error("TextView: children must be primitives");
        }
    }

    if (children.length > 1) {
        children[0] = children.join("");
    }
}
Component.extend(TextView, "TextView");

TextViewPrototype = TextView.prototype;

TextViewPrototype.render = function() {
    return new View("TextView", null, null, this.props, this.children, null, null);
};
