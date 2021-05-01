import { Request, Response } from "express";
import { PessoasServices } from "../services/PessoasServices";

class PessoasController {
    async create(request: Request, response: Response){
        const {pess_nome, pess_email, pess_senha} = request.body;

        const pessoasServices = new PessoasServices();

        try{
            const pessoas = await pessoasServices.create({pess_nome, pess_email, pess_senha});

            return response.json(pessoas);
        }catch(err){
            return response.status(400).json({
                msg: err.message,
            });
        }
        
    }

    async retornaPessoa(request: Request, response: Response){
        const { pess_email, pess_senha } = request.query;
        // console.log(typeof pess_email)
        // return response.json(request.query);
        const pessoasServices = new PessoasServices();
        try{
            const dados = await pessoasServices.buscaPessoas(pess_email as string, pess_senha as string);

            return response.json(dados);
        }catch(err){
            return response.status(400).json({
                msg: err.message,
            });
        }
    }
}

export { PessoasController }