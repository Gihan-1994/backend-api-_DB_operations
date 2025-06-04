import { config } from "dotenv";
import {MongoClient} from "mongodb";
config();

const {MONGODB_ATLAS_URI} = process.env

export async function connectToMongoDB() {
    let mongoClient: MongoClient;
    try {
        if (!MONGODB_ATLAS_URI) {
            throw new Error("MONGODB_ATLAS_URI is not defined in .env file");
        }

        mongoClient = new MongoClient(MONGODB_ATLAS_URI);
        console.log('🐱‍👤 connecting to MongoDB');
        await mongoClient.connect();
        return mongoClient;

    }catch (ex) {
        console.error('🐞 Error connecting to MongoDB:', ex);
        process.exit(1);
    }
}