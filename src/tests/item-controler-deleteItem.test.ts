import request from'supertest';
import {ItemController} from "../controllers/item-controller";
import {ItemModel} from "../models/mongoose_schema";
import express from "express";
// Mock the ItemModel so we don't touch the real database
jest.mock('../models/mongoose_schema');
// Create an express app just for testing
const app = express();
app.use(express.json());
app.delete('/api/v1/items/delete-item/:uid', ItemController.deleteItem);

describe('ItemController', () => {
    //clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete an item', async () => {
        // Mock the database response
        (ItemModel.findOneAndDelete as jest.Mock).mockResolvedValue({
            name: 'John',
            age: 30,
            uid: 1
        });
        const response = await request(app)
            .delete('/api/v1/items/delete-item/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Item deleted successfully 👍',
            result: {
                name: 'John',
                age: 30,
                uid: 1
            }
        });
        expect(ItemModel.findOneAndDelete).toHaveBeenCalledWith({uid: 1});
    });
});