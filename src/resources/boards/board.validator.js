const putValidator = async data => {
  const { title, columns } = data;
  if (typeof title !== 'string') {
    return false;
  }
  const chekColumns = columns.map(item => {
    if (
      typeof item.id !== 'string' ||
      typeof item.title !== 'string' ||
      typeof item.order !== 'number' ||
      item.id.length < 1 ||
      item.title.length < 1
    ) {
      return false;
    }
    return true;
  });

  return !chekColumns.includes(false);
};

module.exports = { putValidator };
