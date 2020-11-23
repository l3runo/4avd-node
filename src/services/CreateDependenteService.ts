
import Dependente from '../models/Dependente';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

interface Request {
    name: string,
    funcionario_id: string,
    data_nasc: string,
    grau_parentesco: string,
    photo: string;

}

class CreateDependenteService {
    public async execute({name, data_nasc, grau_parentesco, photo, funcionario_id}: Request): Promise<Dependente> { 
       const dependentesRepository  = getRepository(Dependente);
        if (grau_parentesco === '1') {
            const dependente = dependentesRepository.create({ 
                name,
                data_nasc,
                grau_parentesco: '1 - esposo(a)',
                photo,
                funcionario_id
            });
            dependentesRepository.save(dependente)
            return dependente
        }
        if (grau_parentesco === '2') {
            const dependente = dependentesRepository.create({ 
                name,
                data_nasc,
                grau_parentesco: '2 - filho(a)',
                photo,
                funcionario_id
            });
            dependentesRepository.save(dependente)
            return dependente
        }

        if (grau_parentesco === '3') {
            const dependente = dependentesRepository.create({ 
                name,
                data_nasc,
                grau_parentesco: '3 - enteado(a)',
                photo,
                funcionario_id
            });
            dependentesRepository.save(dependente)
            return dependente
        } else {
            throw new AppError('Grau de parentesco incorreto, favor especificar entre 1 (esposo(a)) , 2 (filho(a)) ou 3 (enteado(a))', 401);
        }

       
    }
}

export default CreateDependenteService;