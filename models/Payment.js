import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    affiliate: { type: String },
    buyer_address: { type: String },
    buyer_street: { type: String },
    buyer_house_number: { type: String },
    buyer_city: { type: String },
    buyer_state: { type: String },
    buyer_company_name: { type: String },
    buyer_country: { type: String },
    buyer_country_code: { type: String },
    buyer_email: { type: String, required: true },
    buyer_firstname: { type: String },
    buyer_id: { type: String },
    buyer_lastname: { type: String },
    buyer_phone_number: { type: String },
    buyer_zipcode: { type: String },
    order_id: { type: String, required: true },
    product_id: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
