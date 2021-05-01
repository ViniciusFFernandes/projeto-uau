import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm"

@Entity("pessoas")
class Pessoas{
    @PrimaryColumn()
    idpessoas: number;

    @Column()
    pess_nome: string;
    
    @Column()
    pess_email: string;
    
    @Column()
    pess_senha: string;

}

export {Pessoas}