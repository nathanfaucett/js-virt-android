var root = require("./root");


module.exports = unmount;


function unmount() {
    var currentRoot = root.current;

    if (currentRoot !== null) {
        currentRoot.unmount();
        root.current = currentRoot = null;
    }
}
