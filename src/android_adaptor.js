var MessengerAndroid = require("messenger_android"),
    consts = require("./consts");


module.exports = AndroidAdaptor;


function AndroidAdaptor(root, androidInterface) {
    var messenger = new MessengerAndroid(androidInterface),
        eventManager = root.eventManager,
        events = eventManager.events;

    this.root = root;
    this.messenger = messenger;

    eventManager.propNameToTopLevel = consts.propNameToTopLevel;

    messenger.on("handle_event_dispatch", function(data, callback) {
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
        messenger.emit("handle_transaction", transaction, callback);
    };
}
