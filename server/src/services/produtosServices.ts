import { getCustomRepository, Repository } from "typeorm";
import { Produtos } from "../entities/Produtos";
import { ProdutosRepository } from "../repositories/produtosRepository";

interface IProdutosCreate{
    idprodutos?: string;
    prod_nome?: string;
    prod_descricao?: string;
    prod_foto?: string;
    prod_preco?: number;
    prod_idpessoas?: number;
}

class ProdutosServices{
    private produtosRepository: Repository<Produtos>;

    constructor(){
        this.produtosRepository = getCustomRepository(ProdutosRepository);
    }

    async create({ prod_nome,prod_descricao,prod_foto,prod_preco,prod_idpessoas } : IProdutosCreate){

        const produtos = this.produtosRepository.create({
            prod_nome,
            prod_descricao,
            prod_foto,
            prod_preco,
            prod_idpessoas
        })

        await this.produtosRepository.save(produtos);
        
        const idprodutos = await this.produtosRepository.find({
            select: ["idprodutos"],
            order: {
                idprodutos: "DESC"
            },
            skip: 0,
            take: 1
        })
        
        return idprodutos[0];
    }

    async att({idprodutos, prod_nome,prod_descricao,prod_foto,prod_preco,prod_idpessoas } : IProdutosCreate){

        const produtos = await this.produtosRepository.findOne(idprodutos);

        this.produtosRepository.merge(produtos, {prod_nome,prod_descricao,prod_foto,prod_preco,prod_idpessoas});
        
        const results = await this.produtosRepository.save(produtos);
                
        return results;
    }

    async delete({idprodutos} : IProdutosCreate){

        const results = await this.produtosRepository.delete(idprodutos);

        return results;
    }

    async ListByPessoas(idpessoas: string){

        const prod_idpessoas = parseInt(idpessoas)
        
        const list = await this.produtosRepository.find({
            where: {prod_idpessoas},
            relations: ["pessoas"],
        });

        return list;
    }

    async ListProdutos(){

        const list = await this.produtosRepository.find({
            relations: ["pessoas"],
        });

        return list;
    }

    async exibeProduto(idproduto){

        const idprodutos = parseInt(idproduto)

        const list = await this.produtosRepository.find({
            where: {idprodutos},
            relations: ["pessoas"],
        });

        return list[0];
    }

    
}

export { ProdutosServices }