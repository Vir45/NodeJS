const uuid = require('uuid');
const mongoose = require('mongoose');

// class Board {
//   constructor({ id = uuid(), title = 'TITLE', columns = [new Column()] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns.map(item => new Column(item));
//   }

//   static toResponseBoard(board) {
//     return board;
//   }
// }

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
