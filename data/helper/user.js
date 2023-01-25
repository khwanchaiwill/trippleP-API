const db = require('./../dbconfig')
const mapper = require('./mappers.js')

module.exports = {
    find,
    findById,
    findBlog,
    update,
    remove,
    add,
    addBlog,
    removeBlog,
    getuserBlog,

}
function find (){
    return db('users')
}
function findById(id){
    let query = db('users')
    if(id){
        return query
            .where({id})
            .first();
    }
}

function findBlog(id){
    let query = db('blog');
    if(id) {
        query
        .join('users')
        .where('users.id', id)
        .first();
        const promise = [query, getuserBlog(id)];
        return Promise.all(promise)
            .then( results => {
                const [users, blog,] = results;
                if (users){
                    users.blog = blog;

                    return mapper.userToBody(users);
                }else{
                    return null;
                }
            });
        
    }else{
        return query.then(user=> {
            return user.map(use => mapper.userToBody(use));
        })
    }
    
}

function add(user){
    return db('users')
        .insert(user, 'id')
        .then(([id]) => findById(id))
}
function addBlog(blogs){
    return db('blog')
        .join('users')
        .insert(blogs, 'id')
        .where('user_id', userId)
        .then(blog => blog.map(task => mapper.blogToBody(task)));
}
function removeBlog(id){
    return db('blog')
        .where('user_id', id)
        .del();
}
function update(change, id){
    return db('users')
        .where({id})
        .update(change)
        .then(count => count > 0 ? findById(id) : null)
}
function remove(id){
    return db('users')
        .where('id', id)
        .del();
}

function getuserBlog(userId){
    return db('users')
        .join('blog')
        .where('user_id', userId)
        .then(blog => blog.map(task => mapper.blogToBody(task)));
}
