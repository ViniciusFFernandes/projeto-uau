import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProdutos1619547110748 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns: [
                    {
                        name: "idprodutos",
                        type: "int",
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true
                    },
                    {
                        name: "prod_nome",
                        type: "varchar"
                    },
                    {
                        name: "prod_descricao",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "prod_foto",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "prod_preco",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        isNullable: true,
                        default: 0.00
                    },
                    {
                        name: "prod_idpessoas",
                        type: "int"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKPessoas",
                        referencedTableName: "pessoas",
                        referencedColumnNames: ["idpessoas"],
                        columnNames: ["prod_idpessoas"],
                        onDelete: "RESTRICT",
                        onUpdate: "NO ACTION"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produtos");
    }

}
