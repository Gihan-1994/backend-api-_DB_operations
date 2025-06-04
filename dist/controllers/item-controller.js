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
exports.ItemController = void 0;
const db_js_1 = require("../configs/db.js");
class ItemController {
    static createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { name } = req.body;
            try {
                if (!name)
                    throw new Error("Name is required");
                if (!db_js_1.db.data) {
                    throw new Error('Database not initialized');
                }
                const newId = (potentialID = db_js_1.db.data.items.length + 1) => {
                    const itemExsists = db_js_1.db.data.items.some(item => item.id === potentialID);
                    return itemExsists ? newId(potentialID + 1) : potentialID;
                };
                const newItem = {
                    id: newId(),
                    name
                };
                (_a = db_js_1.db.data) === null || _a === void 0 ? void 0 : _a.items.push(newItem);
                yield db_js_1.db.write();
                res.status(200).json({ message: 'Item added successfully' });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error adding item', error: errorMessage });
            }
        });
    }
    static getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield db_js_1.db.read();
                res.status(200).json({ message: 'Items', Items: (_a = db_js_1.db.data) === null || _a === void 0 ? void 0 : _a.items });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error getting items', error: errorMessage });
            }
        });
    }
    static updateItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id } = req.params;
            const { name } = req.body;
            try {
                if (!name || !id)
                    throw new Error("Name and id is required");
                yield db_js_1.db.read();
                const itemIndex = (_a = db_js_1.db.data) === null || _a === void 0 ? void 0 : _a.items.findIndex((item) => item.id === parseInt(id));
                if (itemIndex === -1) {
                    throw new Error("Item not found");
                }
                db_js_1.db.data.items[itemIndex] = {
                    id: parseInt(id),
                    name
                };
                yield db_js_1.db.write();
                res.status(200).json({ message: 'Item updated successfully' });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error updating item', error: errorMessage });
            }
        });
    }
    static deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id } = req.params;
            try {
                yield db_js_1.db.read();
                const itemIndex = (_a = db_js_1.db.data) === null || _a === void 0 ? void 0 : _a.items.findIndex((item) => item.id === parseInt(id));
                if (itemIndex === -1) {
                    throw new Error("Item not found");
                }
                // db.data.items = db.data.items.filter((item) => item.id !== parseInt(id));
                db_js_1.db.data.items.splice(itemIndex, 1);
                yield db_js_1.db.write();
                res.status(200).json({ message: 'Item deleted successfully' });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error deleting item', error: errorMessage });
            }
        });
    }
}
exports.ItemController = ItemController;
