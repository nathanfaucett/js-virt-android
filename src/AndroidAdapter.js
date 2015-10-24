var Messenger = require("messenger"),
    MessengerWebSocketAdapter = require("messenger_websocket_adapter"),
    consts = require("./events/consts");


module.exports = AndroidAdapter;


function AndroidAdapter(root, socket, attachMessage, sendMessage) {
    var messenger = new Messenger(new MessengerWebSocketAdapter(socket, attachMessage, sendMessage)),
        eventManager = root.eventManager,
        events = eventManager.events;

    this.root = root;
    this.messenger = messenger;

    eventManager.propNameToTopLevel = consts.propNameToTopLevel;

    messenger.on("virt.android.handleEventDispatch", function(data, callback) {
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
        messenger.emit("virt.android.handleTransaction", transaction, callback);
    };
}
