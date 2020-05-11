const connection = require('../database/connection');

module.exports = {
    async create(req,res){        
        const { mesa, pedidos, user } = req.body;
        const error = null;
        pedidos.map(async (pedido) => {
            try{
                if(pedido.tipo == 'prato'){
                    await connection('pedido').insert({
                        mesa,
                        pedidos:pedido.nome
                    })
                }
                else if(pedido.tipo == ''){
                    await connection('funcionario').insert({
                        pedidos:pedido.nome,
                        mesa,
                        user
                    })
                }

            }
            catch(erro){
                error = erro;
                console.log(erro);
            }
        })
        return error ? res.json({ message: "Erro ao enviar pedido" }) :  res.json({ message: "Pedido enviado!" })
        
    },
    async index(req, res){
        const pedido = await connection('pedido').orderBy('dataHora');
        return res.json(pedido);        
    },
    async delete(req, res){
        let erro = null;
        try {
            const { id } = req.query;
            await connection('pedido').where({ id }).delete();
        } catch (error) {
            erro = error;
            console.log(erro);
        }
        return erro?res.json({message:"Erro ao deletar pedidos"}):res.json({message:"pedido(s) deletado(s) com sucesso"});

    }
}