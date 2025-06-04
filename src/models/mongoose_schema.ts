import {Schema} from "mongoose";
import * as mongoose from "mongoose";

export interface IItem
{
    name: string;
    age: number;
    uid: number;
}


 const ItemSchema = new Schema<IItem>({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    uid: {type: Number, required: true}
})

export const ItemModel = mongoose.model<IItem>('Items', ItemSchema);