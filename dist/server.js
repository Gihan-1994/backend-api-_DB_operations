"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./configs/db.js");
const item_routes_js_1 = __importDefault(require("./routes/item-routes.js"));
const app = (0, express_1.default)();
const port = 3000;
//Initialize Database
(0, db_js_1.initializeDatabase)().then(() => {
    console.log('Database initialized ✔');
});
// Middlewares
//Json Parser
app.use(express_1.default.json());
//Custom Middlewares
app.use((req, res, next) => {
    console.log("Hello from custom middleware 😉");
    next();
});
app.get('/', (req, res) => {
    res.json('🐱‍Hello Gihan with Backend!');
});
//routes middleware
app.use('/api/v1/items', item_routes_js_1.default);
app.listen(port, () => {
    console.log(` 🐱 Server running at http://localhost:${port}`);
});
