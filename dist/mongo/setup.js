"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../shared/config"));
mongoose_1.default.connect(config_1.default.mongoConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log('Some problem with the connection ' + err);
    }
    else {
        console.log('The Mongoose connection is ready');
    }
});
//# sourceMappingURL=setup.js.map