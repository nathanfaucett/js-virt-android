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

virtAndroid.render(
    virt.createView("div",
        virt.createView("input", {
            value: "Hello World!"
        }),
        virt.createView("button", "Click Me!")
    ), {
        socket: socket
    }
);
