import {Request, Response} from "express";
import {db} from "../configs/db.js";
import {ItemModel} from "../models/mongoose_schema";
import {IItem} from "../models/mongoose_schema";

export class ItemController {

    public static async createItem(req: Request, res: Response) {
        const {name,age} = req.body;

        try {
            if (!name || !age)
            throw new Error("Name and age is required")

            const newID = async ():Promise<number> => {

                let potentialID: number = 0;
              do {
                  potentialID++;
                  console.log('🎃 potentialID',potentialID);
              }while (await ItemModel.exists({uid: potentialID}))
              return potentialID;
            };
            const id = await newID();
            const newItem = new ItemModel(
                {
                    name,
                    age,
                    uid: id
                });
            const result = await newItem.save();

            res.status(200).json({message: 'Item added successfully 👍', result});
        } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : '🐞Unknown error occurred';
            res.status(400).json({message: '🐞Error adding item', error: errorMessage});
        }
    }

    public static async getItems(req: Request, res: Response) {
        try {
            const result = await ItemModel.find({});
            res.status(200).json({message: '😉Items', result});
        } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : '🐞Unknown error occurred';
            res.status(400).json({message: '🐞Error getting items' , error: errorMessage});
        }
    }

    public static async updateItem(req: Request, res: Response) {
        const {uid} = req.params;
        const {name,age} = req.body;

        try {
            if ((!name || !age) && !uid)
            throw new Error("🤔 Name or age and id is required")

            const result = await ItemModel.findOneAndUpdate(
                {uid: parseInt(uid)},
                {name,age },
                {options : {new: true}});
            res.status(200).json({message: '😉Item updated successfully', result});
        } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : '🐞Unknown error occurred';
            res.status(400).json({message: '🐞Error updating item', error: errorMessage});
        }
    }

    public static async deleteItem(req: Request, res: Response) {
        const {uid} = req.params;
        try {
            const result = await ItemModel.findOneAndDelete({uid: parseInt(uid)});
            res.status(200).json({message: 'Item deleted successfully', result});
        } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : 'Unknown error occurred';
            res.status(400).json({message: 'Error deleting item', error: errorMessage});
        }
    }
}
