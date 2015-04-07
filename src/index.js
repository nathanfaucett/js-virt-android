var virt = require("virt"),
    AndroidAdaptor = require("./android_adaptor");


var virtAndroid = exports,

    ComponentPrototype = virt.Component.prototype,
    root = null;


virtAndroid.render = function(view) {
    if (root === null) {
        root = new virt.Root();
        root.adaptor = new AndroidAdaptor(root);

        ComponentPrototype.emitMessage = emitMessage;
        ComponentPrototype.onMessage = onMessage;
        ComponentPrototype.offMessage = offMessage;
    }

    return root.render(view);
};

virtAndroid.unmount = function() {
    if (root !== null) {
        root.unmount();
        root = null;
    }
};

function emitMessage(name, data, callback) {
    return this.__node.root.adaptor.messenger.emit(name, data, callback);
}

function onMessage(name, callback) {
    return this.__node.root.adaptor.messenger.on(name, callback);
}

function offMessage(name, callback) {
    return this.__node.root.adaptor.messenger.off(name, callback);
}
