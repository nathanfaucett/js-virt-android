var virt = require("virt"),
    virtAndroid = require("../../src/index");


var root = new virt.Root();


root.adaptor = {
    handle: function(transaction, callback) {
        console.log(JSON.stringify(transaction));
        callback();
    }
};

root.render(virt.createView("View",
    virt.createView("Input"),
    virt.createView("Button")
));
