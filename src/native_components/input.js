var virt = require("virt");


var View = virt.View,
    Component = virt.Component,
    InputPrototype;


virt.registerNativeComponent("Input", Input);


function Input(props, children, context) {

    Component.call(this, props, children, context);

    if (process.env.NODE_ENV !== "production") {
        if (children.length > 0) {
            throw new Error("Input: input can't have children");
        }
    }
}
Component.extend(Input, "Input");

InputPrototype = Input.prototype;

InputPrototype.getValue = function(callback) {
    this.emitMessage("__Input:getValue__", {
        id: this.getId()
    }, callback);
};

InputPrototype.setValue = function(value, callback) {
    this.emitMessage("__Input:setValue__", {
        id: this.getId(),
        value: value
    }, callback);
};

InputPrototype.render = function() {
    return new View("Input", null, null, this.props, this.children, null, null);
};
