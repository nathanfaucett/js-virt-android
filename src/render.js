var virt = require("virt"),
    root = require("./root"),
    AndroidAdapter = require("./AndroidAdapter");


module.exports = render;


function render(view, callback, socket, attachMessage, sendMessage) {
    var currentRoot = root.current;

    if (currentRoot === null) {
        root.current = currentRoot = new virt.Root();
        currentRoot.adapter = new AndroidAdapter(currentRoot, socket, attachMessage, sendMessage);
    }

    currentRoot.render(view, callback);

    return currentRoot;
}
