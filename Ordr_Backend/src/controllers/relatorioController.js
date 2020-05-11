const connection = require('../database/connection');

module.exports = {
    async abrir(req,res){
        var debito= 0.00, credito= 0.00, dinheiro= 0.00, total = 0.00;
        // const {debito, credito, dinheiro} = req.body;
        await connection('relatorio').insert({
            debito, 
            credito,
            dinheiro,
            total
        })
        const relatorios = await connection('relatorio').orderBy('dataHora', 'desc');
        return res.json(relatorios); 
    },
    async index(req, res){
        const relatorios = await connection('relatorio').orderBy('dataHora', 'desc');
        return res.json(relatorios);     
    },
    
    async add(req, res){
        const [idMax] = await connection('relatorio').max('id');
        const [data] = await connection('relatorio').select('*').where({id:idMax['max(`id`)']});
        const {debito, credito, dinheiro} = data;
        const { addDebito, addCredito, addDinheiro } = req.body;
        const total = parseFloat(debito+addDebito+addCredito+credito+dinheiro+addDinheiro).toFixed(2);
        await connection('relatorio').where({id:idMax['max(`id`)']}).update({
            debito:(debito+addDebito),
            credito:(credito+addCredito),
            dinheiro:(dinheiro+addDinheiro),
            total,
        });
        return res.json({message:"Venda fechada!"});
    },

}