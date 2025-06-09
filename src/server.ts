import express from 'express';
import {Response, Request} from 'express';
import itemRoutes from "./routes/item-routes.js";
import  mongoose from "mongoose";
import { config } from "dotenv";



config(
    {
        path: "./.env"
    }
);

const MONGODB_ATLAS_URI: string = process.env.MONGODB_ATLAS_URI!;

const app = express();
const port = 3000;

//Initialize Database
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
// Middlewares
//Json Parser
app.use(express.json());

//Custom Middlewares
app.use((req, res, next) => {
    console.log("Hello from custom middleware 😉");
    next();
})

app.get('/', (req: Request, res: Response) => {
    res.json('🐱‍Hello Gihan with Backend running on port 3000!');
});
//routes middleware
app.use('/api/v1/items', itemRoutes)


app.listen(port, () => {
    console.log(` 🐱 Server running at http://localhost:${port}`);
});