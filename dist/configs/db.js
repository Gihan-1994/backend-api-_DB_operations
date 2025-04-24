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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.db = void 0;
const lowdb_1 = require("lowdb");
const node_1 = require("lowdb/node");
//setup Database
const adapter = new node_1.JSONFile("db.json");
exports.db = new lowdb_1.Low(adapter, { items: [] });
//initialize Database
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.db.read();
    exports.db.data || (exports.db.data = { items: [] }); // Set defaults if file is empty
    //db.data = db.data || { items: [] };
    yield exports.db.write();
});
exports.initializeDatabase = initializeDatabase;
