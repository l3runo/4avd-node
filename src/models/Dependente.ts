import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Funcionario from './Funcionario';

@Entity('dependentes')
class Dependente {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // define que é uma coluna normal que por padrão se não especificar o tipo, ele irá usar varchar(string).
    funcionario_id: string;
    
    @ManyToOne(() => Funcionario) // Define oq deve retornar, e classificamos Como Muitos Para Um
    @JoinColumn({name: 'funcionario_id'})
    funcionario : Funcionario;

    @Column()
    name: string;

    @Column()
    data_nasc: string;

    @Column()
    grau_parentesco: string;

    @Column()
    photo: string;
}


export default Dependente;