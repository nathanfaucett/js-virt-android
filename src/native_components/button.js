var virt = require("virt"),
    some = require("some"),
    isNotPrimitive = require("./is_not_primitive");


var View = virt.View,
    Component = virt.Component,
    ButtonPrototype;


virt.registerNativeComponent("Button", Button);


function Button(props, children, context) {

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
Component.extend(Button, "Button");

ButtonPrototype = Button.prototype;

ButtonPrototype.render = function() {
    return new View("Button", null, null, this.props, this.children, null, null);
};
