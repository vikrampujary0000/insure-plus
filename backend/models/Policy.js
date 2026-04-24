const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    name: { type: String, required: true },
    premium: { type: Number, required: true },
    coverage: { type: Number, required: true },
    duration: { type: Number, required: true },
    eligibility: { type: String, required: true },
    benefits: { type: [String], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Policy', PolicySchema);