
exports.up = function(knex) {
    return knex.schema.createTable('relatorio', function(table){
        table.increments('id');
        table.timestamp('dataHora').defaultTo(knex.fn.now());
        table.decimal('debito');
        table.decimal('credito');
        table.decimal('dinheiro');
        table.decimal('total');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('relatorio');
};
