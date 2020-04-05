const boardRepo = require('./board.memory.repository');
const dataBoards = require('../data/data').dataBoards;
const Board = require('./board.model');
let dataColumns = require('../data/data').dataColumns;
let dataTasks = require('../data/data').dataTasks;
const boardValidator = require('./board.validator');

const getAll = () => boardRepo.getAll();

const getId = async params => {
  if (typeof params !== 'string') {
    return false;
  }
  const boards = await getAll();
  const result = boards.find(item => item.id === params);
  return result;
};

const postBoard = async data => {
  if (typeof data.title !== 'string' || !Array.isArray(data.columns)) {
    return false;
  }
  const board = new Board(data);
  dataBoards.push(board);
  const { columns } = board;
  dataColumns = [...dataColumns, ...columns];
  return board;
};

const putBoard = async (body, params) => {
  const validator = await boardValidator.putValidator(body);
  if (!validator) {
    return false;
  }
  const boards = await getAll();
  const boardForPut = boards.find(item => item.id === params);
  const index = boards.indexOf(boardForPut);
  if (index < 0) return false;
  let { columns } = body;
  const { title } = body;
  const id = params;
  const lastColumns = boardForPut.columns;

  const chek = lastColumns.map(item => {
    const result = columns.findIndex(elem => elem.id === item.id);
    return result;
  });

  const columnsWithotChanges = [...columns];

  for (let i = 0; i < chek.length; i++) {
    if (chek[i] > -1) {
      lastColumns.splice(i, 1, columnsWithotChanges[chek[i]]);
      columns = columns.filter(item => item !== columnsWithotChanges[chek[i]]);
    }
  }
  const newColumns = [...lastColumns, ...columns];
  columns = [...newColumns];
  const newBoards = new Board({ id, title, columns });
  dataBoards.splice(index, 1, newBoards);
  return newBoards;
};

const deletBoard = async params => {
  const boards = await getAll();
  const boardForDelet = boards.find(item => item.id === params);
  const index = boards.indexOf(boardForDelet);
  console.log(index);
  if (index < 0) {
    return -1;
  }
  const boardId = boardForDelet.id;
  dataTasks = dataTasks.filter(item => item.boardId !== boardId);
  console.log(dataTasks);
  dataBoards.splice(index, 1);
  return index;
};

module.exports = { getAll, getId, postBoard, putBoard, deletBoard };
