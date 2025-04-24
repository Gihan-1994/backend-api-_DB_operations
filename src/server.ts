import express from 'express';
import {Response, Request} from 'express';
import {initializeDatabase, db} from "./configs/db.js";
import itemRoutes from "./routes/item-routes.js";

const app = express();
const port = 3000;

//Initialize Database
initializeDatabase().then(
    () => {
        console.log('Database initialized ✔');
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