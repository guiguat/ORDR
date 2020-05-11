
exports.up = function(knex) {
  return knex.schema.createTable('produto', function(table){
      table.increments('id');
      table.string('nome').notNullable();
      table.float('preco').notNullable();
      table.integer('estoque').notNullable();
      table.string('tipo').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produto');
};
