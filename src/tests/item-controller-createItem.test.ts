import request from 'supertest';
import {ItemController} from "../controllers/item-controller";
import {ItemModel} from "../models/mongoose_schema";
import express from "express";

// Mock the ItemModel so we don't touch the real database
jest.mock('../models/mongoose_schema');

// Create an express app just for testing
const app = express();
app.use(express.json());
app.post('/api/v1/items/add-items', ItemController.createItem);

describe('ItemController createItem', () => {
//clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new item with name and age', async () => {
        // Mock the database response
        // Mock the exists check to return false otherwise it will always return true and never set uid to 1
        ( ItemModel.exists as jest.Mock).mockResolvedValue(false);

        // Mock the constructor to return our mock item
        (ItemModel as unknown as jest.Mock).mockImplementation(() => ({
            name: 'John',
            age: 30,
            uid: 1,
            save: jest.fn().mockResolvedValue({
                name: 'John',
                age: 30,
                uid: 1
            })
        }));

        //Check the response
        const response = await request(app)
            .post('/api/v1/items/add-items')
            .send({name: 'John', age: 30});

        //Check the response
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Item added successfully 👍');
        expect(response.body.result.name).toBe('John');
        expect(response.body.result.age).toBe(30);
        expect(response.body.result.uid).toBe(1);
    })

    it('should return 400 if name or age is missing', async () => {
        //Check the response
        const response = await request(app)
            .post('/api/v1/items/add-items')
            .send({name: 'John'});

        //Check the response
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('🐞Error adding item');
        expect(response.body.error).toBe('Name and age is required');

    })

    it('should handle database errors', async () => {
        // Mock the exists check to throw an error
        const errorMessage = 'Database connection failed';
        (ItemModel.exists as jest.Mock).mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .post('/api/v1/items/add-items')
            .send({ name: 'Test Item', age: 25 });

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            {message: '🐞Error adding item', error: errorMessage});

    });
})