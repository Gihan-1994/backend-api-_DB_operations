import express from 'express';
import {Response, Request} from 'express';
import itemRoutes from "./routes/item-routes.js";
import * as mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGODB_URI = process.env.MONGODB_ATLAS_URI;

const app = express();
const port = 3000;

//Initialize Database
await mongoose.connect(MONGODB_URI);
// Middlewares
//Json Parser
app.use(express.json());

//Custom Middlewares
app.use((req, res, next) => {
    console.log("Hello from custom middleware 😉");
    next();
})

app.get('/', (req: Request, res: Response) => {
    res.json('🐱‍Hello Gihan with Backend!');
});
//routes middleware
app.use('/api/v1/items', itemRoutes)


app.listen(port, () => {
    console.log(` 🐱 Server running at http://localhost:${port}`);
});