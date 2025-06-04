import express from 'express';
import {Response, Request} from 'express';
import itemRoutes from "./routes/item-routes.js";
import {connectToMongoDB} from "./configs/mongodb";
import {MongoClient} from "mongodb";
const app = express();
const port = 3000;

// connect to MongoDB
export const mongoDbClient: Promise<MongoClient> = connectToMongoDB().then(
    (client) => {
        console.log('🐱‍ connected to MongoDB');
        return client;
    }
);

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