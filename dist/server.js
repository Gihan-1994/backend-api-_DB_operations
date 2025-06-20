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
exports.connectDatabase = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const item_routes_1 = __importDefault(require("./routes/item-routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: "./.env"
});
const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
//Initialize Database
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGODB_ATLAS_URI, {
            dbName: 'Mongoose_Users'
        });
        console.log("Database connected successfully ✅ ");
    }
    catch (error) {
        console.error('Database connect error 🙄', error.message);
        throw error;
    }
});
exports.connectDatabase = connectDatabase;
/**
mongoose.connect(MONGODB_ATLAS_URI!, {
    dbName: 'Mongoose_Users'},
).then(() => {
    console.log("Database connected successfully ✅ ");
    // mongoose.connection.on('connected', () => {
    //     console.log('Database connected  🎇');
    //     console.log(`Connected to DB: ${mongoose.connection.name}`);
    // });
    // mongoose.connection.on('error', (err) => {
    //     console.error(`Mongoose connection error happened 🙄: ${err.message}`);
    // });
}).catch((error: unknown) => {
    console.error('Database connect error 🙄',(error as Error).message);
})
    **/
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
app.use('/api/v1/items', item_routes_1.default);
// Start server and connect to database
if (process.env.NODE_ENV !== 'test' && require.main === module) {
    mongoose_1.default.connect(MONGODB_ATLAS_URI, {
        dbName: 'Mongoose_Users'
    }).then(() => {
        console.log("Database connected successfully ✅ ");
        app.listen(port, () => {
            console.log(`🐱 Server running at http://localhost:${port}`);
        });
    }).catch((error) => {
        console.error('Database connect error 🙄', error.message);
    });
}
