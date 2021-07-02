"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    itemId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Item'
    },
    catchRate: {
        rookie: Number,
        champion: Number,
        ultimate: Number,
        mega: Number,
        ultra: Number
    }
});
const TamingItem = mongoose_1.model('TamingItem', schema, 'taming-items');
exports.default = TamingItem;
//# sourceMappingURL=taming-item-model.js.map