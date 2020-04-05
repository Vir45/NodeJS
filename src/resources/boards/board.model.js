const uuid = require('uuid');
const Column = require('../columns/column-model');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = [new Column()] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(item => new Column(item));
  }

  static toResponseBoard(board) {
    return board;
  }
}

module.exports = Board;
