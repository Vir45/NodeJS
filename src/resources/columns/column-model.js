const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'string', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { title, order } = column;
    return { title, order };
  }
}

module.exports = Column;
