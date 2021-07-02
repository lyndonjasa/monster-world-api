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
const express_1 = __importDefault(require("express"));
const UploadItemRequest_1 = require("../messages/UploadItemRequest");
const UploadTamingItemRequest_1 = require("../messages/UploadTamingItemRequest");
const upload_service_1 = __importDefault(require("../services/upload-service"));
const UploadRouter = express_1.default.Router();
UploadRouter.post('/upload/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req.body;
    const items = request.map(r => new UploadItemRequest_1.UploadItemRequest(r));
    try {
        const response = yield upload_service_1.default.uploadItems(items);
        res.send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
UploadRouter.post('/upload/taming-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req.body;
    const items = request.map(r => new UploadTamingItemRequest_1.UploadTamingItemRequest(r));
    try {
        const response = yield upload_service_1.default.uploadTamingItems(items);
        res.send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = UploadRouter;
//# sourceMappingURL=upload-routes.js.map