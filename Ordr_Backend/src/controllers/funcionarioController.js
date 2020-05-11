const connection = require('../database/connection');

module.exports = {

    async index(req, res){
        const user  = req.query.user;

        const pedido = await connection('funcionario').orderBy('id').where({ user });

        return res.json(pedido);        
    },

    async delete(req, res){
        const id  = req.query.id;  
        let idArr = id.replace(/\s/g, "").split(',');
        idArr.map(async (item)=>await connection('funcionario').where({ id:item }).delete())
        return res.json({message:"Informacoes deletadas com sucesso!"});
    }

}