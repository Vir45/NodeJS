const postValidator = async item => {
  const { title, order, description, boardId } = item;
  if (
    typeof title !== 'string' ||
    typeof order !== 'number' ||
    typeof description !== 'string' ||
    typeof boardId !== 'string'
  ) {
    return false;
  }
  return true;
};

const putTaskValidator = async item => {
  const { title, order, description, boardId, id } = item;

  if (
    typeof title !== 'string' ||
    typeof order !== 'number' ||
    typeof description !== 'string' ||
    typeof boardId !== 'string' ||
    typeof id !== 'string'
  ) {
    return false;
  }
  return true;
};

const deleteValidator = async item => {
  const [boardId, taskId] = item;
  if (typeof boardId !== 'string' || typeof taskId !== 'string') {
    return false;
  }
  return true;
};

module.exports = {
  postValidator,
  putTaskValidator,
  deleteValidator
};
