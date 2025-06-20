import request from "supertest";
import express from "express";
import {ItemController} from "../controllers/item-controller";
import {ItemModel} from "../models/mongoose_schema";

// Mock the ItemModel so we don't touch the real database
jest.mock('../models/mongoose_schema');

const app = express();
app.use(express.json());
app.get('/api/v1/items/get-items', ItemController.getItems);

describe('ItemController getItems', () => {
    //clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return empty array when no items are found', async () => {
        // Mock the database response
        (ItemModel.find as jest.Mock).mockResolvedValue([]);

        const response = await request(app)
            .get('/api/v1/items/get-items')
            .expect(200);

        expect(response.body.message).toBe('😉Items');
        expect(response.body.result).toEqual([]);
    })
    it ('should return 2 items when 2 items are found', async () => {
        const mockItems: { name: string, age: number, uid: number}[] =
            [
            { uid: 1,name: 'John', age: 30 },
            { uid: 2 ,name: 'Jane', age: 20 }
            ];


        // Mock the database response
        (ItemModel.find as jest.Mock).mockResolvedValue(mockItems);

        const response = await request(app)
            .get('/api/v1/items/get-items')
            .expect(200);

        expect(response.body.message).toBe('😉Items');
        expect(response.body.result).toEqual(mockItems);
    })

    it('should handle database errors', async () => {
        const errorMessage = 'Database connection failed';
        (ItemModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .get('/api/v1/items/get-items')
            .expect(400);

        expect(response.body.message).toBe('🐞Error getting items');
        expect(response.body.error).toBe(errorMessage);
    });
})
