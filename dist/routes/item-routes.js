"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_controller_1 = require("../controllers/item-controller");
const router = express_1.default.Router();
router.post('/add-items', item_controller_1.ItemController.createItem);
router.get('/get-items', item_controller_1.ItemController.getItems);
router.put('/update-item/:uid', item_controller_1.ItemController.updateItem);
router.delete('/delete-item/:uid', item_controller_1.ItemController.deleteItem);
exports.default = router;
