"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTamingItems = exports.uploadItems = void 0;
const item_model_1 = __importDefault(require("../mongo/models/item-model"));
const taming_item_model_1 = __importDefault(require("../mongo/models/taming-item-model"));
const uploadItems = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield item_model_1.default.startSession();
    session.startTransaction();
    let items = [];
    try {
        items = yield item_model_1.default.insertMany(request);
    }
    catch (error) {
        throw error;
    }
    finally {
        session.endSession();
    }
    return items;
});
exports.uploadItems = uploadItems;
const uploadTamingItems = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield taming_item_model_1.default.startSession();
    session.startTransaction();
    let items = [];
    try {
        for (let index = 0; index < request.length; index++) {
            const requestItem = request[index];
            const relatedItem = yield item_model_1.default.findOne({ name: requestItem.name });
            const tamingItem = {
                itemId: relatedItem._id,
                catchRate: requestItem.catchRate
            };
            const result = yield new taming_item_model_1.default(tamingItem).save();
            items.push(result);
        }
    }
    catch (error) {
        throw error;
    }
    finally {
        session.endSession();
    }
    return items;
});
exports.uploadTamingItems = uploadTamingItems;
exports.default = {
    uploadItems: exports.uploadItems,
    uploadTamingItems: exports.uploadTamingItems
};
//# sourceMappingURL=upload-service.js.map