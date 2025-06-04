"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_routes_js_1 = __importDefault(require("./routes/item-routes.js"));
const mongoose = __importStar(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { MONGODB_ATLAS_URI } = process.env;
const app = (0, express_1.default)();
const port = 3000;
//Initialize Database
mongoose.connect(MONGODB_ATLAS_URI, {
    dbName: 'Mongoose_Users'
}).then(() => {
    console.log("Database connected successfully ✅ ");
    // mongoose.connection.on('connected', () => {
    //     console.log('Database connected successfully ✅');
    //     console.log(`Connected to DB: ${mongoose.connection.name}`);
    // });
    //
    // mongoose.connection.on('error', (err) => {
    //     console.error(`Mongoose connection error ❌: ${err.message}`);
    // });
}).catch((error) => {
    console.error('Database connect error ❌', error.message);
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
