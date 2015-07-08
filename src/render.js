var virt = require("virt"),
    root = require("./root"),
    AndroidAdapter = require("./AndroidAdapter");


module.exports = render;


function render(view, options) {
    var currentRoot = root.current;

    if (currentRoot === null) {
        root.current = currentRoot = new virt.Root();
        options = options || {};

        currentRoot.adapter = new AndroidAdapter(currentRoot,
            options.socket,
            options.attachSocketMessage,
            options.sendSocketMessage
        );
    }

    currentRoot.render(view);

    return currentRoot;
}
