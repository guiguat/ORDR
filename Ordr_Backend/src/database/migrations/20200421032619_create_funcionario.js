exports.up = function(knex) {
    return knex.schema.createTable('funcionario', function(table){
        table.increments('id');
        table.string('pedidos').notNullable();
        table.integer('mesa').notNullable();
        table.string('user').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('funcionario');
};
