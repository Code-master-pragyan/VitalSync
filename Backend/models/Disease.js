import mongoose from 'mongoose';

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  symptoms: [String],
  progression: [String],
  severity: {
    type: String,
    enum: ['Mild', 'Moderate', 'Serious'],
    required: true
  }
}, { timestamps: true });

const Disease = mongoose.model('Disease', diseaseSchema);
export default Disease;