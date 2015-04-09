var virt = require("virt");


var VirtView = virt.View,
    Component = virt.Component,
    ViewPrototype;


virt.registerNativeComponent("View", View);


function View(props, children, context) {
    Component.call(this, props, children, context);
}
Component.extend(View, "View");

ViewPrototype = View.prototype;

ViewPrototype.render = function() {
    return new VirtView("View", null, null, this.props, this.children, null, null);
};
