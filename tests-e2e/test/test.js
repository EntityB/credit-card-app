const axios = require('axios');
const assert = require('assert');
const { describe } = require('node:test');

const API_URL = process.env.API_URL || "http://localhost:8080";
console.log("Running tests against: " + API_URL);

console.log('API Tests');

describe('Single customer can be saved and found', () => {
    it('should link partial credit card to a customer', async () => {
        const response = await axios.put(`${API_URL}/link`, {
            partialCreditCard: {
                trailingDigits: '3456',
                leadingDigits: '5407',
                cardType: 'MasterCard',
                startDate: '08.2012',
                expiryDate: '08.2015',
            },
            customer: {
                email: 'john@example.com',
                firstName: 'John',
            },
        });

        assert.strictEqual(response.status, 200);
    });

    it('should get matching customer based on partial credit card details', async () => {
        const response = await axios.get(`${API_URL}/match?trailingDigits=3456`);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.length, 1);

        const customer = response.data[0];
        assert.strictEqual(customer.email, 'john@example.com');
        assert.strictEqual(customer.firstName, 'John');
    });
});

describe('Single customer saved with different credit card details will be suggested only once', () => {
    it('should link second partial credit card to a customer', async () => {
        const response = await axios.put(`${API_URL}/link`, {
            partialCreditCard: {
                trailingDigits: '3456',
                leadingDigits: '5407'
            },
            customer: {
                email: 'john@example.com',
                firstName: 'John',
            },
        });

        assert.strictEqual(response.status, 200);
    });

    it('should get single matching customer even tho two cards are saved for him', async () => {
        const response = await axios.get(`${API_URL}/match?trailingDigits=3456`);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.length, 1);

        const customer = response.data[0];
        assert.strictEqual(customer.email, 'john@example.com');
        assert.strictEqual(customer.firstName, 'John');
    });
});

describe('Two customers with matching credit card details will be suggested', () => {
    it('should link different customer with same trailingDigits', async () => {
        const response = await axios.put(`${API_URL}/link`, {
            partialCreditCard: {
                trailingDigits: '3456',
                leadingDigits: '7777'
            },
            customer: {
                email: 'mark@example.com',
                firstName: 'Mark',
            },
        });

        assert.strictEqual(response.status, 200);
    });

    it('should get matching customers based on same trailingDigits', async () => {
        const response = await axios.get(`${API_URL}/match?trailingDigits=3456`);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.length, 2);

        const customers = response.data;

        const customerJohn = customers.find((customer) => customer.email === 'john@example.com');
        assert.ok(customerJohn);
        assert.strictEqual(customerJohn.firstName, 'John');

        const customerMark = customers.find((customer) => customer.email === 'mark@example.com');
        assert.ok(customerMark);
        assert.strictEqual(customerMark.firstName, 'Mark');
    });
});
