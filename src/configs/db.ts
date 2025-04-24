import {Low} from "lowdb";
import {JSONFile} from "lowdb/node";

interface DbSchema {
    items: {
        id: number,
        name: string,
    }[];
}

//setup Database
const adapter = new JSONFile<DbSchema>("db.json");
export const db = new Low(adapter, {items: []});

//initialize Database
export const initializeDatabase = async () => {
    await db.read();
    db.data ||= {items: []}; // Set defaults if file is empty
    //db.data = db.data || { items: [] };
    await db.write();
};