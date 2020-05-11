
exports.up = function(knex) {
    return knex.schema.createTable('contas', function(table){
        table.increments('id');
        table.string('pedido').notNullable();
        table.float('preco').notNullable();
        table.string('cliente').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('contas');
};
