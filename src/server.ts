import express from 'express';
import {Response, Request} from 'express';
import itemRoutes from "./routes/item-routes";
import  mongoose from "mongoose";
import { config } from "dotenv";
import path from "node:path";

config(
    {
        path: "./.env"
    }
);

const MONGODB_ATLAS_URI: string = process.env.MONGODB_ATLAS_URI!;

const app = express();
const port = 3000;

//Initialize Database
 const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_ATLAS_URI!, {
            dbName: 'Mongoose_Users'
        });
        console.log("Database connected successfully ✅ ");
    } catch (error: unknown) {
        console.error('Database connect error 🙄', (error as Error).message);
        throw error;
    }
};
/**
mongoose.connect(MONGODB_ATLAS_URI!, {
    dbName: 'Mongoose_Users'},
).then(() => {
    console.log("Database connected successfully ✅ ");
    // mongoose.connection.on('connected', () => {
    //     console.log('Database connected  🎇');
    //     console.log(`Connected to DB: ${mongoose.connection.name}`);
    // });
    // mongoose.connection.on('error', (err) => {
    //     console.error(`Mongoose connection error happened 🙄: ${err.message}`);
    // });
}).catch((error: unknown) => {
    console.error('Database connect error 🙄',(error as Error).message);
})
    **/
// Middlewares
//Json Parser
app.use(express.json());
//app.use(express.static(path.join(__dirname, '../public')));

//Custom Middlewares
app.use((req, res, next) => {
    console.log("Hello from custom middleware 😉");
    next();
})

app.get('/', (req: Request, res: Response) => {
    res.json('🐱‍Hello Gihan with Backend running on port 3000!');
  //  res.sendFile(path.join(__dirname, '../public/index.html'))
});
//routes middleware
app.use('/api/v1/items', itemRoutes)


// Start server and connect to database
if (process.env.NODE_ENV !== 'test' && require.main === module) {
    mongoose.connect(MONGODB_ATLAS_URI!, {
        dbName: 'Mongoose_Users'},
    ).then(() => {
        console.log("Database connected successfully ✅ ");
        app.listen(port, () => {
            console.log(`🐱 Server running at http://localhost:${port}`);
        });
    }).catch((error: unknown) => {
        console.error('Database connect error 🙄',(error as Error).message);
    })
}





export {app};
export {connectDatabase};
