const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

// Webhook endpoint
app.post('/order', (req, res) => {
    const { firstname, lastname, email, orderId } = req.body;

    console.log('Webhook received with the following details:');
    console.log(`Firstname: ${firstname}`);
    console.log(`Lastname: ${lastname}`);
    console.log(`Email: ${email}`);
    console.log(`Order ID: ${orderId}`);

    // Validate required fields
    if (!firstname || !lastname || !email || !orderId) {
        return res.status(400).send('Missing required parameters');
    }

    // Acknowledge receipt of the webhook
    res.status(200).send('ORDER COMPLETED');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Webhook server is running on http://localhost:${PORT}`);
});