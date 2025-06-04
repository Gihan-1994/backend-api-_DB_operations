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
const server_1 = require("../server");
class ItemController {
    static createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, age } = req.body;
            try {
                if (!name)
                    throw new Error("Name is required");
                // Create a client
                const client = yield server_1.mongoDbClient;
                //Create a database
                const mDb = client.db("Metarune_Users");
                //Create a collection
                const collection = mDb.collection("Mongo-Items");
                //Create a new ID
                const newID = () => __awaiter(this, void 0, void 0, function* () {
                    let potentialID = 0;
                    do {
                        potentialID++;
                    } while (yield collection.findOne({ uid: { $eq: potentialID } }));
                    return potentialID;
                });
                const getID = yield newID();
                const newItem = {
                    name,
                    age,
                    uid: getID,
                };
                //Insert the new item to collection
                const result = yield collection.insertOne(newItem);
                //Generate a response
                res.status(200).json({ message: 'Item added successfully 😎', result });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error adding item', error: errorMessage });
            }
        });
    }
    static getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Create a client
                const client = yield server_1.mongoDbClient;
                // Select a database
                const database = client.db("Metarune_Users");
                // Select a collection
                const collection = database.collection("Mongo-Items");
                //Sort items by uid
                const sortFields = { uid: 1 };
                //Get all items
                const result = yield collection.find({}).sort(sortFields).toArray();
                res.status(200).json({ message: 'Items', Items: result });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error getting items', error: errorMessage });
            }
        });
    }
    static updateItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const { name, age } = req.body;
            try {
                if ((!name || !age) && !uid)
                    throw new Error("Name or Age and id is required");
                const client = yield server_1.mongoDbClient;
                const database = client.db("Metarune_Users");
                const collection = database.collection("Mongo-Items");
                const result = yield collection.updateOne({ uid: parseInt(uid) }, // Query criteria to find the document
                { $set: { name, age } }, // Update operation
                { upsert: false } // Upsert option
                );
                if (result.modifiedCount === 0) {
                    throw new Error("Item not found");
                }
                res.status(200).json({ message: 'Item updated successfully', result });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error updating item', error: errorMessage });
            }
        });
    }
    static deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            try {
                const client = yield server_1.mongoDbClient;
                const database = client.db("Metarune_Users");
                const collection = database.collection("Mongo-Items");
                const result = yield collection.deleteOne({ uid: parseInt(uid) } // Query criteria to find the document
                );
                if (result.deletedCount === 0) {
                    throw new Error("Item not found");
                }
                res.status(200).json({ message: 'Item deleted successfully 😊', result });
            }
            catch (ex) {
                const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
                res.status(400).json({ message: 'Error deleting item', error: errorMessage });
            }
        });
    }
}
exports.ItemController = ItemController;
