
exports.up = function(knex) {
    return knex.schema.createTable('cliente', function(table){
        table.increments('id');
        table.string('nome').notNullable();
        table.string('documento').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cliente');
};
