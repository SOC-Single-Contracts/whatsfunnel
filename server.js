import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
 try {
   const {
     affiliate,
     buyer_address,
     buyer_street,
     buyer_house_number,
     buyer_city,
     buyer_state,
     buyer_company_name,
     buyer_country,
     buyer_country_code,
     buyer_email,
     buyer_firstname,
     buyer_id,
     buyer_lastname,
     buyer_phone_number,
     buyer_zipcode,
     order_id,
     product_id,
   } = req.body;
 
   console.log('Webhook received with the following data:');
   console.log(req.body);
 
   // Basic validation
   if (!order_id || !product_id || !buyer_email) {
     return res.status(400).json({
       status: 'error',
       message: 'Missing required fields: order_id, product_id, or buyer_email',
     });
   }
 
   // Respond to the webhook sender
   res.status(200).json({
     status: 'success',
     message: 'Webhook processed successfully',
     data: req.body,
   });
 } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      data: error,
    });
 }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Webhook server running on http://localhost:${PORT}`);
});
