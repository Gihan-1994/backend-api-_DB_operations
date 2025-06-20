import express from "express";
import {ItemController} from "../controllers/item-controller";

const router = express.Router();

router.post('/add-items', ItemController.createItem)
router.get('/get-items', ItemController.getItems)
router.put('/update-item/:uid', ItemController.updateItem)
router.delete('/delete-item/:uid', ItemController.deleteItem)

export default router