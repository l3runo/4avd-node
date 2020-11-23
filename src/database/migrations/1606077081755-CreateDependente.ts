import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDependente1606077081755 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'dependentes',
                columns: [
                    {
                        name: 'id', // Define o nome da coluna
                        type: 'uuid', // Define o tipo do dado da coluna
                        isPrimary: true, // Essa flag diz se a primary key ou não
                        generationStrategy: 'uuid', // Essa flag define o metodo de geração como uuid para o id
                        default: 'uuid_generate_v4()' // define a função para gerar o uuid v4
                    },
                    {
                        name: 'funcionario_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'data_nasc',
                        type: 'varchar',
                    },
                    {
                        name: 'grau_parentesco',
                        type: 'varchar',
                    },
                    {
                        name: 'photo',
                        type: 'varchar',
                    },
                ],
            })
        )
        await queryRunner.createForeignKey('dependentes', new TableForeignKey({
            name: 'FuncionarioId', // Define um nome para o foreign key
            columnNames: ['funcionario_id'], // coluna da tabela appointments que vai ser uma foreign key
            referencedColumnNames: ['id'], // coluna que referencia a foreing key
            referencedTableName: 'funcionarios', // tabela que referencia a foreign key
            onDelete: 'SET NULL', // Isso vai setar null o campo caso o usuario seja deletado
            onUpdate: 'CASCADE', // Isso caso o id seja alterado, vai alterar o id em todos os relacionamentos feitos.
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('dependentes', 'FuncionarioId'); // Deleta a foreign key
        await queryRunner.dropTable('dependentes');
    }

}
