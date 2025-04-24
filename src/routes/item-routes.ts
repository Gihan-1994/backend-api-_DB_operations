import express from "express";
import {ItemController} from "../controllers/item-controller.js";

const router = express.Router();

router.post('/add-items', ItemController.createItem)
router.get('/get-items', ItemController.getItems)
router.put('/update-item/:id', ItemController.updateItem)
router.delete('/delete-item/:id', ItemController.deleteItem)

export default router