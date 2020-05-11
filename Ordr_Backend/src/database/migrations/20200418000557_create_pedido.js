
exports.up = function(knex) {
    return knex.schema.createTable('pedido', function(table){
        table.increments('id');
        table.integer('mesa').notNullable();
        table.string('pedidos').notNullable();
        table.timestamp('dataHora').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedido');
};
