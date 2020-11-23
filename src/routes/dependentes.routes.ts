import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import CreateDependenteService from '../services/CreateDependenteService'
import {getRepository} from 'typeorm'
import multer from 'multer';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import Dependente from '../models/Dependente';

const dependentesRouter = Router(); // define uma variavel para inicializar o router
const upload = multer(uploadConfig); // Define a variavel que vai inicializar o multer passando como parametro a upload config
const createDependente = new CreateDependenteService(); 

dependentesRouter.post('/', upload.single('image'), async(request : Request, response : Response) => { 
        const {name, data_nasc, grau_parentesco, funcionario_id} = request.body;
        const photo = `http://localhost/files/${request.file.filename}`; // MUDAR CONFORME O PC
        const dependente = await createDependente.execute({name, data_nasc, grau_parentesco, funcionario_id, photo}); 
        return response.json(dependente);
});

dependentesRouter.get('/', async (request: Request, response: Response) => { 
    const dependentesRepository = getRepository(Dependente);
    const dependente = await dependentesRepository.find(); 
    return response.json(dependente); // retorna um json com o resultado obtido.
});

dependentesRouter.get('/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const dependentesRepository = getRepository(Dependente);
    const dependente = await dependentesRepository.findOne( { id });

    return response.json(dependente);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o dependente)', 404);
    }
});

dependentesRouter.get('/funcionario/:id', async (request, response) => {
    try {
    const {id} = request.params;
    const dependentesRepository = getRepository(Dependente);
    const dependente = await dependentesRepository.find( { funcionario_id : id })
    const dep = dependente.map(dep => ({name: dep.name, data_nasc: dep.data_nasc, grau_parentesco: dep.grau_parentesco, photo: dep.photo}));
    return response.json(dep);

    
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o dependente)', 404);
    }
});

//ALTERAR DEPENDENTE
dependentesRouter.patch('/:id', upload.single('image'), async(request: Request, response: Response) => { 
    try {
            const { id } = request.params;
            const dependentesRepository = getRepository(Dependente);
            const dependente = await dependentesRepository.findOne({ id });
     
            const {name, data_nasc, funcionario_id, grau_parentesco} = request.body;
            const photo = `http://localhost:3333/files/${request.file.filename}`;
    
            dependente.name = name;
            dependente.funcionario_id = funcionario_id;
            dependente.data_nasc = data_nasc;
            dependente.grau_parentesco = grau_parentesco;
            dependente.photo = photo;
    
            await dependentesRepository.save(dependente); // Salva no banco de dados     
            return response.json(dependente);
    }
    catch(err) {
            throw new AppError('Não foi possivel localizar o dependente)', 404);
    }
    
});


//ROTA DE DELETAR

dependentesRouter.delete('/:id', async(request: Request, response: Response) => {
    const {id} = request.params;
    const dependentesRepository = getRepository(Dependente);
    const dependente = await dependentesRepository.findOne({ id });
    dependentesRepository.remove(dependente);

    response.json({ok: true});
});
export default dependentesRouter; // exporta a variavel