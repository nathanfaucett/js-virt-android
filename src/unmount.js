var root = require("./root");


module.exports = unmount;


function unmount(callback) {
    var currentRoot = root.current;

    if (currentRoot !== null) {
        currentRoot.unmount(callback);
        root.current = currentRoot = null;
    }
}
