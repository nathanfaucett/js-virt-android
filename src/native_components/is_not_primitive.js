var isPrimitive = require("is_primitive");


module.exports = isNotPrimitive;


function isNotPrimitive(child) {
    return !isPrimitive(child);
}
