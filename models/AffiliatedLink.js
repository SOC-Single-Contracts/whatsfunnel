// models/AffiliatedLink.js
import mongoose from 'mongoose';

const affiliatedLinkSchema = new mongoose.Schema({
  agency_id: {
    type: String,
    required: true,
  },
  affiliated_link: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const AffiliatedLink = mongoose.model('AffiliatedLink', affiliatedLinkSchema);

export default AffiliatedLink;
