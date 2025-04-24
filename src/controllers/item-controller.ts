import {Request, Response} from "express";
import {db} from "../configs/db.js";

export class ItemController {

    public static async createItem(req: Request, res: Response) {
        const {name} = req.body;

        try {
            if (!name)
            throw new Error("Name is required")

            if (!db.data) {
                throw new Error('Database not initialized');
            }
            const newId = (potentialID: number = db.data!.items.length + 1): number => {
                const itemExsists = db.data!.items.some(item => item.id === potentialID);
                return itemExsists ? newId(potentialID + 1) : potentialID;
            }
            const newItem = {
                id: newId(),
                name
            };
            db.data?.items.push(newItem);
            await db.write();
            res.status(200).json({message: 'Item added successfully'});
        } catch (error) {
            res.status(400).json({message: 'Error adding item'});
        }
    }

    public static async getItems(req: Request, res: Response) {
        try {
            await db.read();
            res.status(200).json({message: 'Items', Items: db.data?.items});
        } catch (error) {
            res.status(400).json({message: 'Error getting items'});
        }
    }

    public static async updateItem(req: Request, res: Response) {
        const {id} = req.params;
        const {name} = req.body;

        try {
            if (!name || !id)
            throw new Error("Name and id is required")
            await db.read();
            const itemIndex = db.data?.items.findIndex((item) => item.id === parseInt(id));
            if (!itemIndex) {
                throw new Error("Item not found")
            }
            db.data.items[itemIndex] = {
                id: parseInt(id),
                name
            }
            await db.write();
            res.status(200).json({message: 'Item updated successfully'});
        } catch (ex) {
            res.status(400).json({message: 'Error updating item', error: ex});
        }
    }

    public static async deleteItem(req: Request, res: Response) {
        const {id} = req.params;
        try {
            await db.read();
            const itemIndex = db.data?.items.findIndex((item) => item.id === parseInt(id));
            if (!itemIndex) {
                throw new Error("Item not found");
            }
            // db.data.items = db.data.items.filter((item) => item.id !== parseInt(id));
            db.data.items.splice(itemIndex, 1);
            await db.write();
            res.status(200).json({message: 'Item deleted successfully'});
        } catch (ex) {
            res.status(400).json({message: 'Error deleting item', error: ex});
        }
    }
}
