const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number,
        id: {
          type: String,
          default: uuid
        }
      }
    ],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponseBoard = board => {
  const { title, columns } = board;
  const { _id } = board;
  const id = _id;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
