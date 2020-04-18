const uuid = require('uuid');
const mongosee = require('mongoose');

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'string',
//     order = 0,
//     description = 'string',
//     userId = 'string',
//     boardId = 'string',
//     columnId = 'string'
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }

//   static toResponse(task) {
//     return task;
//   }
// }

const taskShema = new mongosee.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskShema.statics.toResponse = task => {
  const { title, order, description, boardId, columnId, userId } = task;
  const { _id } = task;
  const id = _id;
  return { id, title, order, description, boardId, columnId, userId };
};

const Task = mongosee.model('Task', taskShema);

module.exports = Task;
