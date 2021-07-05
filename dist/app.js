"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./mongo/setup");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./shared/config"));
const express_1 = __importDefault(require("express"));
const all_routes_1 = __importDefault(require("./routes/all-routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env);
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
all_routes_1.default.forEach(r => {
    app.use(r);
});
app.get("/", (req, res) => {
    res.send("Monster World API " + config_1.default.environment);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server listening to port: " + port);
});
//# sourceMappingURL=app.js.map