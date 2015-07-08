var Messenger = require("messenger"),
    MessengerWebSocketAdapter = require("messenger_websocket_adapter"),
    consts = require("./events/consts");


module.exports = AndroidAdapter;


function AndroidAdapter(root, socket, attachSocketMessage, sendSocketMessage) {
    var messenger = new Messenger(new MessengerWebSocketAdapter(socket, attachSocketMessage, sendSocketMessage)),
        eventManager = root.eventManager,
        events = eventManager.events;

    this.root = root;
    this.messenger = messenger;

    eventManager.propNameToTopLevel = consts.propNameToTopLevel;

    messenger.on("__AndroidAdapter:handleEventDispatch__", function(data, callback) {
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

        callback();
    });

    this.handle = function(transaction, callback) {
        messenger.emit("__AndroidAdapter:handleTransaction__", transaction, callback);
    };
}
