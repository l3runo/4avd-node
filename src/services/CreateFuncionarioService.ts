
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import Funcionario from '../models/Funcionario';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';

interface RequestDTO {
    name: string;
    functionn: string;
    department: string;
    email: string;
    phone: string;
    photo: string;
}

class CreateFuncionarioService {
    public async execute({name, functionn, department, email, phone, photo}: RequestDTO): Promise<Funcionario> {
        const funcionarioRepository = getRepository(Funcionario);
        const funcionario = funcionarioRepository.create({
            name,
            function: functionn,
            department,
            email,
            phone,
            photo,
            likes: 0,
        });

        funcionarioRepository.save(funcionario)

        return funcionario;
    }
}

export default CreateFuncionarioService;