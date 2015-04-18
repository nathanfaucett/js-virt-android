var virt = require("virt"),
    AndroidAdaptor = require("./android_adaptor");


require("./native_components/button");
require("./native_components/input");
require("./native_components/text_view");
require("./native_components/view");


var virtAndroid = exports,
    root = null;


virtAndroid.socket = null;
virtAndroid.attachSocketMessage = null;
virtAndroid.sendSocketMessage = null;

virtAndroid.render = function(view) {
    if (root === null) {
        root = new virt.Root();
        root.adaptor = new AndroidAdaptor(root,
            virtAndroid.socket,
            virtAndroid.attachSocketMessage,
            virtAndroid.sendSocketMessage
        );
    }

    root.render(view);

    return root;
};

virtAndroid.unmount = function() {
    if (root !== null) {
        root.unmount();
        root = null;
    }
};
