const connection = require('../database/connection');

module.exports = {
    async create(req,res){
        const { nome, documento } = req.body;
        let error = null;
        try{
            await connection('cliente').insert({
                nome, 
                documento
            })
        }
        catch(err){
            error = err;
            console.log(err);
        }
        return error ? res.json({message: "Erro ao cadastrar"}) :  res.json({message: "Cadastro concluido!"});
    },

    async index(req, res){
        let error = null;
        let cliente;
        try{
            cliente = await connection('cliente').select('*');
        }
        catch(err){
            error = err;
            console.log(err);
        }  
        return error ? res.json({message: "Erro ao receber dados"}) :  res.json(cliente);
    },

    async edit(req, res){
        const { id, nome, documento } = req.body;
        let error = null;
        try{
            await connection('cliente').where({id}).update({
                nome,
                documento
            })
        }
        catch(err){
            error = err;
            console.log(err);
        }
        return error ? res.json({message: "Erro ao editar dados"}) :  res.json({message:"Informacoes editadas com sucesso!"}); 
    },
    async delete(req, res){
        const id  = req.query.id;  
        let error=null;      
        try{
            await connection('cliente').where({id}).delete();
        }
        catch(err){
            error = err;
            console.log(err);
        }
        return error ? res.json({message: "Erro ao deletar dados"}) :  res.json({message:"Informacoes deletadas com sucesso!"}); 
    }
}