var MessengerWebSocket = require("messenger_websocket"),
    consts = require("./consts");


module.exports = AndroidAdaptor;


function AndroidAdaptor(root, socket) {
    var messenger = new MessengerWebSocket(socket),
        eventManager = root.eventManager,
        events = eventManager.events;

    this.root = root;
    this.messenger = messenger;

    eventManager.propNameToTopLevel = consts.propNameToTopLevel;

    messenger.on("__AndroidAdaptor:handleEventDispatch__", function(data, callback) {
        var childHash = root.childHash,
            topLevelType = data.topLevelType,
            targetId = data.targetId,
            nativeEvent = data.nativeEvent,
            eventType = events[topLevelType],
            target = childHash[targetId];

        if (target && eventType[targetId]) {
            nativeEvent.target = target.component;
            eventType[targetId](nativeEvent);
        }

        callback(undefined);
    });

    this.handle = function(transaction, callback) {
        messenger.emit("__AndroidAdaptor:handleTransaction__", transaction, callback);
    };
}
