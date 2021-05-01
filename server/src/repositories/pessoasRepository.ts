import { EntityRepository, Repository } from "typeorm";
import { Pessoas } from "../entities/Pessoas";


@EntityRepository(Pessoas)
class  PessoasRepository extends Repository<Pessoas>{
    
}

export {PessoasRepository}