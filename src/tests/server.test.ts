// __tests__/server.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {app,connectDatabase} from '../server';
import express from 'express';

// Set test environment before importing server
process.env.NODE_ENV = 'test';

describe('Server Tests', () => {
    let mongoServer : MongoMemoryServer;
    beforeAll(async () => {
        // Start the in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, {
            dbName: 'test_db'
        });

    });
    afterAll(async () => {
        // Clean up
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    afterEach(async () => {
        // Clean up any test data between tests
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });
    describe('Database Connection', () => {
        it('should connect to the database', async () => {
            expect(mongoose.connection.readyState).toBe(1);
            expect(mongoose.connection.name).toBe('test_db');
        })

    })

    describe('Base Route Tests', () => {
        test('GET / should return welcome message', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);

            expect(response.body).toBe('🐱‍Hello Gihan with Backend running on port 3000!');

        });

        test('GET / should have correct content type', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);

            expect(response.headers['content-type']).toMatch(/json/);
        });
    });

})
