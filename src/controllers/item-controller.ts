import {Request, Response} from "express";
import {db} from "../configs/db.js";
import {mongoDbClient} from "../server";

interface Item {
    name: string;
    age: number;
    uid: number;
}

export class ItemController {

    public static async createItem(req: Request, res: Response) {
        const {name, age}: { name: string, age: number } = req.body;

        try {
            if (!name)
                throw new Error("Name is required")
            // Create a client
            const client = await mongoDbClient;
            //Create a database
            const mDb = client.db("Metarune_Users");
            //Create a collection
            const collection = mDb.collection("Mongo-Items");

            //Create a new ID
            const newID = async (): Promise<number> => {
                let potentialID: number = 0;
                do {
                    potentialID++;
                } while (await collection.findOne({uid: {$eq: potentialID}}))
                return potentialID;
            };

            const getID = await newID();

            const newItem: Item = {
                name,
                age,
                uid: getID,
            };
            //Insert the new item to collection
            const result = await collection.insertOne(newItem);
            //Generate a response
            res.status(200).json({message: 'Item added successfully 😎', result});
        } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
            res.status(400).json({message: 'Error adding item', error: errorMessage});
        }
    }

    public static async getItems(req: Request, res: Response) {
        try {
            //Create a client
            const client = await mongoDbClient;
            // Select a database
            const database = client.db("Metarune_Users");
            // Select a collection
            const collection = database.collection<Item>("Mongo-Items");
            //Sort items by uid
            const sortFields: { [key: string]: 1 } = {uid: 1};
            //Get all items
            const result = await collection.find<Item>({}).sort(sortFields).toArray();
            res.status(200).json({message: 'Items', Items: result});
        } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
            res.status(400).json({message: 'Error getting items', error: errorMessage});
        }
    }

    public static async updateItem(req: Request, res: Response) {
        const {uid} = req.params;
        const {name, age} = req.body;

        try {
            if ((!name || !age) && !uid)
                throw new Error("Name or Age and id is required")
            const client = await mongoDbClient;
            const database = client.db("Metarune_Users");
            const collection = database.collection<Item>("Mongo-Items");
            const result = await collection.updateOne(
                {uid: parseInt(uid)},// Query criteria to find the document
                {$set: {name, age}},// Update operation
                {upsert: false}// Upsert option
            );

            if (result.modifiedCount === 0) {
                throw new Error("Item not found");
            }

            res.status(200).json({message: 'Item updated successfully', result});
        } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
            res.status(400).json({message: 'Error updating item', error: errorMessage});
        }
    }

    public static async deleteItem(req: Request, res: Response) {
        const {uid} = req.params;
        try {
            const client = await mongoDbClient;
            const database = client.db("Metarune_Users");
            const collection = database.collection<Item>("Mongo-Items");
            const result = await collection.deleteOne(
                {uid: parseInt(uid)}  // Query criteria to find the document
            );
            if (result.deletedCount === 0) {
                throw new Error("Item not found");
            }

            res.status(200).json({message: 'Item deleted successfully 😊', result});
        } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
            res.status(400).json({message: 'Error deleting item', error: errorMessage});
        }
    }
}
