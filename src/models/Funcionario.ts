import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('funcionarios')
class Funcionario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    function: string;

    @Column()
    department: string;

    @Column()
    email: string;

    @Column()
    phone: string;


    @Column()
    photo: string;


    @Column()
    likes: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn() 
    updated_at: Date;
}


export default Funcionario;