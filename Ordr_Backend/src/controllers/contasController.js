const connection = require('../database/connection');

module.exports = {
    async create(req,res){        
        const { produtos, cliente } = req.body;
        const error = null;
        produtos.map(async (produto) => {
            try{
                await connection('contas').insert({
                    pedido:produto.nome,
                    preco:produto.preco,
                    cliente
                })
            }
            catch(erro){
                error = erro;
                console.log(erro);
            }
        })
        return error ? res.json({ message: "Erro ao enviar pedido" }) :  res.json({ message: "Pedido enviado!" })
        
    },
    async index(req, res){
        let error = null;
        const cliente = req.query.cliente;
        let pedidos;
        try {
            pedidos = await connection('contas').where({cliente}).select('*');
        } catch (err) {
            console.log(err)
            error = err;
        }
        return error ? res.json({ message: "Erro ao carregar pedidos" }) :  res.json(pedidos);       
    },
    async delete(req, res){
        const cliente = req.query.cliente;
        let error=null;
        try {
            await connection('contas').where({ cliente }).delete();
        } catch (err) {
            error = err;
            console.log(err);
        }
        return error ? res.json({ message: "Erro ao deletar pedidos" }) :  res.json({message:"pedido(s) deletado(s) com sucesso"});   
    }
}