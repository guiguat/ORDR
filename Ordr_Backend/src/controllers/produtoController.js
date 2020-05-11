const connection = require('../database/connection');

module.exports = {
    async create(req,res){
        const { nome, preco, estoque, tipo } = req.body;

        await connection('produto').insert({
            nome, 
            preco,
            estoque,
            tipo
        })

        return res.json({
            message: "Cadastro concluido!"
        });
    },
    async index(req, res){
        if(req.query.id != undefined){
            const [produto] = await connection('produto').select('*').where({
                id: req.query.id
            });
            return res.json(produto);
        }
        else{
            const produto = await connection('produto').select('*').orderBy('estoque');
            return res.json(produto);
        }
        
    },
    async edit(req, res){
        let erro = null;
        try {
            const { id, nome, preco, estoque, tipo } = req.body;
            await connection('produto').where({id}).update({
                nome,
                preco,
                estoque,
                tipo
            })
        } catch (error) {
            erro = error;
            console.log(error);
        }
        return erro? res.json({message:"Erro ao editar informações"}) : res.json({message:"Informacoes editadas com sucesso!"});
    },
    async delete(req, res){
        const { id } = req.query;
        await connection('produto').where({id}).delete();
        return res.json({message:"Informacoes deletadas com sucesso!"});
    },
    async estoque(req,res){
        let erro = null;
        try {
            const { id, estoque } = req.body;
            await connection('produto').where({id}).update({ estoque })
        } catch (error) {
            erro = error;
            console.log(error);
        }
        return erro? res.json({message:"Erro ao editar informações"}) : res.json({message:"Informacoes editadas com sucesso!"});
    }
}