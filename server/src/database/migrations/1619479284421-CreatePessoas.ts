import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePessoas1619479284421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pessoas",
                columns: [
                    {
                        name: "idpessoas",
                        type: "int",
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true
                    },
                    {
                        name: "pess_nome",
                        type: "varchar"
                    },
                    {
                        name: "pess_email",
                        type: "varchar"
                    },
                    {
                        name: "pess_senha",
                        type: "varchar"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pessoas");
    }

}
