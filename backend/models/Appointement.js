const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointementSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: 'pending',
    enum: ['pending', 'accepted', 'refused']
  },
  customerName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creattionDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


const Appointement = mongoose.model('Appointement', appointementSchema);

module.exports = Appointement;
