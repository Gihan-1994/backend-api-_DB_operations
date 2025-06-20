import request from "supertest";
import express from "express";
import {ItemController} from "../controllers/item-controller";
import {ItemModel} from "../models/mongoose_schema";

// Mock the ItemModel so we don't touch the real database
jest.mock('../models/mongoose_schema');
const app = express();
app.use(express.json());
app.put('/items/:uid', ItemController.updateItem);

describe('ItemController updateItem', () => {
    //clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update an item when name and age are provided', async () => {
        // This represents the updated item that the database returns
        const mockUpdatedItem = {
            uid: 2,
            name: 'NGG',
            age: 24,
        };

        // Mock the database method to return the updated item
        (ItemModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedItem);

        // The data we're sending to update the item
        const updateData = {
            name: 'NGG',
            age: 24
        };

        const response = await request(app)
            .put('/items/2') // Correct route with uid parameter
            .send(updateData); // Send only the fields to update

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('😉Item updated successfully');
        expect(response.body.result).toEqual(mockUpdatedItem);

        // Verify the database method was called with correct parameters
        expect(ItemModel.findOneAndUpdate).toHaveBeenCalledWith(
            {uid: 2}, // Filter condition
            { name: 'NGG', age: 24 }, // Update data
            { options: { new: true } } // Options
        );
    });
        it('should pass either age or name is provided', async () => {
            const mockItem: { name: string, age: number, uid: number } =
                {
                    uid: 2,
                    name: 'NGG',
                    age: 24
                };
            (ItemModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockItem);
            const response = await request(app)
                .put('/items/2')
                .send({
                    name: 'NGG'
                });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('😉Item updated successfully');
            expect(response.body.result).toEqual(mockItem);
        })

    it('should return error when required fields are missing', async () => {
        const response = await request(app)
            .put('/items/4')
            .send({})
            .expect(400);

        expect(response.body.message).toBe('🐞Error updating item');
        expect(response.body.error).toBe('🤔 Name or age and id is required');
    });
})