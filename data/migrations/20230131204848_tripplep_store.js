/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('admins', (ad) => {
        ad.increments();
        ad.string("name", 256).notNullable();
        ad.string('username', 256).notNullable().unique();
        ad.string('password', 256).notNullable();
        ad.string('email', 256).unique();
    })
    .createTable('users', (user) => {
        user.increments();
        user.string('name', 256).notNullable();
        user.string('username').notNullable().unique();
        user.string('email', 256).notNullable().unique();
        user.string('password', 256).notNullable();
    })
    .createTable('categories', (cate) =>{
        cate.increments();
        cate.string('category_name', 256).notNullable();
        cate.string('message').notNullable();
        cate.blob('category_images');
    })
    .createTable('products', (pro) =>{
        pro.increments();
        pro.string('product_name', 256).notNullable();
        pro.string('describe').notNullable();
        pro.blob('product_images');
        pro.integer('quantity').notNullable();
        pro.integer('categories_id').notNullable()
            .unsigned()
            .references('categories.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('products')
    .dropTableIfExists('catagories')
    .dropTableIfExists('users')
    .dropTableIfExists('admins')
};
