"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_routes_js_1 = __importDefault(require("./routes/item-routes.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: "./.env"
});
const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
const app = (0, express_1.default)();
const port = 3000;
//Initialize Database
mongoose_1.default.connect(MONGODB_ATLAS_URI, {
    dbName: 'Mongoose_Users'
}).then(() => {
    console.log("Database connected successfully ✅ ");
    // mongoose.connection.on('connected', () => {
    //     console.log('Database connected  🎇');
    //     console.log(`Connected to DB: ${mongoose.connection.name}`);
    // });
    // mongoose.connection.on('error', (err) => {
    //     console.error(`Mongoose connection error happened 🙄: ${err.message}`);
    // });
}).catch((error) => {
    console.error('Database connect error 🙄', error.message);
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
    res.json('🐱‍Hello Gihan with Backend running on port 3000!');
});
//routes middleware
app.use('/api/v1/items', item_routes_js_1.default);
app.listen(port, () => {
    console.log(` 🐱 Server running at http://localhost:${port}`);
});
