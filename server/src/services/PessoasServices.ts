import { getCustomRepository, Repository } from "typeorm";
import { Pessoas } from "../entities/Pessoas";
import { PessoasRepository } from "../repositories/pessoasRepository";

interface IPessoasCreate{
    pess_nome: string;
    pess_email: string;
    pess_senha: string;
}

class PessoasServices {
    private pessoasRepository: Repository<Pessoas>;

    constructor(){
        this.pessoasRepository = getCustomRepository(PessoasRepository);
    }

    async create({ pess_nome, pess_email, pess_senha } : IPessoasCreate){
        
        const emailExistente = await this.pessoasRepository.findOne({
            pess_email
        })

        if(emailExistente){
            throw new Error("Email já cadastrado!");
        }

        const pessoas = this.pessoasRepository.create({
            pess_nome,
            pess_email,
            pess_senha
        })

        await this.pessoasRepository.save(pessoas);

        return pessoas;
    }

    async buscaPessoas(pess_email: string, pess_senha: string){

        const dadosPessoa = await this.pessoasRepository.findOne({
            pess_email
        })
        
        if(dadosPessoa){
            if(pess_senha == dadosPessoa.pess_senha){
                return dadosPessoa
            }else{
                throw new Error("Senha incorreta!");
            }
        }else{
            throw new Error("Email não encontrado!");
        }

    }
}

export { PessoasServices }