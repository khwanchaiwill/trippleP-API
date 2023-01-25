const db = require('../dbconfig');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db('categories');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((cate) => {
        if (cate) {
          return mappers.cateToBody(cate);
        } else {
          return null;
        }
      });
  } else {
    return query.then((cates) => {
      return cates.map((cate) => mappers.cateToBody(cate));
    });
  }
}

function insert(cate) {
  return db('categories')
    .insert(cate, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('categories')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('categories').where('id', id).del();
}
