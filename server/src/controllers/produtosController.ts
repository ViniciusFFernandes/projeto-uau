import { Request, Response } from "express";
import { ProdutosServices } from "../services/produtosServices";

class ProdutosController {
    async create(request: Request, response: Response): Promise<Response>{
        const {prod_nome,prod_descricao,prod_foto,prod_preco,prod_idpessoas} = request.body;

        const produtosServices = new ProdutosServices();

        try{
            const produtos = await produtosServices.create({prod_nome,prod_descricao,prod_foto,prod_preco,prod_idpessoas});

            return response.json(produtos);
        }catch(err){
            return response.status(400).json({
                msg: err.message,
            });
        }
        
    }

    async att(request: Request, response: Response): Promise<Response>{
        const {prod_nome,prod_descricao,prod_foto,prod_preco,prod_idpessoas} = request.body;
        const idprodutos = request.params.idprodutos;

        const produtosServices = new ProdutosServices();

        try{
            const produtos = await produtosServices.att({idprodutos, prod_nome,prod_descricao,prod_foto,prod_preco,prod_idpessoas});

            return response.json(produtos);
        }catch(err){
            return response.status(400).json({
                msg: err.message,
            });
        }
        
    }

    async delete(request: Request, response: Response): Promise<Response>{
        const idprodutos = request.params.idprodutos;

        const produtosServices = new ProdutosServices();

        try{
            const produtos = await produtosServices.delete({idprodutos});

            return response.json(produtos);
        }catch(err){
            return response.status(400).json({
                msg: err.message,
            });
        }
        
    }

    async showByPessoas(request: Request, response: Response){
        const { idpessoas } = request.params;

        const produtosServices = new ProdutosServices();

        const list = await produtosServices.ListByPessoas( idpessoas );

        return response.json(list);
    }

    async showProdutos(request: Request, response: Response){

        const produtosServices = new ProdutosServices();

        const list = await produtosServices.ListProdutos();

        return response.json(list);
    }

    async showProduto(request: Request, response: Response){
        const { idprodutos } = request.params;

        const produtosServices = new ProdutosServices();

        const list = await produtosServices.exibeProduto(idprodutos);

        return response.json(list);
    }
}

export { ProdutosController }