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
const mongoose_schema_1 = require("../models/mongoose_schema");
class ItemController {
    static createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, age } = req.body;
            try {
                if (!name || !age)
                    throw new Error("Name and age is required");
                const newID = () => __awaiter(this, void 0, void 0, function* () {
                    let potentialID = 0;
                    do {
                        potentialID++;
                        console.log('🎃 potentialID', potentialID);
                    } while (yield mongoose_schema_1.ItemModel.exists({ uid: potentialID }));
                    return potentialID;
                });
                const id = yield newID();
                const newItem = new mongoose_schema_1.ItemModel({
                    name,
                    age,
                    uid: id
                });
                const result = yield newItem.save();
                res.status(200).json({ message: 'Item added successfully 👍', result });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : '🐞Unknown error occurred';
                res.status(400).json({ message: '🐞Error adding item', error: errorMessage });
            }
        });
    }
    static getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield mongoose_schema_1.ItemModel.find({});
                res.status(200).json({ message: '😉Items', result });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : '🐞Unknown error occurred';
                res.status(400).json({ message: '🐞Error getting items', error: errorMessage });
            }
        });
    }
    static updateItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const { name, age } = req.body;
            try {
                if ((!name || !age) && !uid)
                    throw new Error("🤔 Name or age and id is required");
                const result = yield mongoose_schema_1.ItemModel.findOneAndUpdate({ uid: parseInt(uid) }, { name, age }, { options: { new: true } });
                res.status(200).json({ message: '😉Item updated successfully', result });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : '🐞Unknown error occurred';
                res.status(400).json({ message: '🐞Error updating item', error: errorMessage });
            }
        });
    }
    static deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            try {
                const result = yield mongoose_schema_1.ItemModel.findOneAndDelete({ uid: parseInt(uid) });
                res.status(200).json({ message: 'Item deleted successfully', result });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error deleting item', error: errorMessage });
            }
        });
    }
}
exports.ItemController = ItemController;
