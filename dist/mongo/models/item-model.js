"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: String,
    description: String,
    cost: Number
});
const Item = mongoose_1.model('Item', schema, 'items');
exports.default = Item;
//# sourceMappingURL=item-model.js.map