var virt = require("virt"),
    virtAndroid = require("../../src/index");


var socket = {
    types: {},
    on: function(type, fn) {
        socket.types[type] = fn;
    },
    send: function(data) {
        console.log(data);
    }
};

virtAndroid.socket = socket;

virtAndroid.render(virt.createView("View",
    virt.createView("Input"),
    virt.createView("Button")
));
