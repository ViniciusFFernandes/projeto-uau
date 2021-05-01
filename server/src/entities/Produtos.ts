import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm"
import { Pessoas } from "./Pessoas";

@Entity("Produtos")
class Produtos {
    @PrimaryColumn()
    idprodutos: number;
    
    @Column()
    prod_nome: string;

    @Column()
    prod_descricao: string;

    @Column()
    prod_foto: string;

    @Column()
    prod_preco: number;

    @JoinColumn({name: "prod_idpessoas"})
    @ManyToOne(() => Pessoas)
    pessoas: Pessoas;

    @Column()
    prod_idpessoas: number;
}

export { Produtos }