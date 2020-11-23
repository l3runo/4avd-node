import { Router, Response, Request } from 'express'; 
import CreateFuncionarioService from '../services/CreateFuncionarioService';
import {getRepository} from 'typeorm'
import Funcionario from '../models/Funcionario';
import uploadConfig from '../config/upload';
import multer from 'multer';
import AppError from '../errors/AppError';
const funcionariosRouter = Router(); // Define a variavel que vai inicializar o router.
const upload = multer(uploadConfig);

const funcionarioService = new CreateFuncionarioService();

funcionariosRouter.post('/', upload.single('image') ,async (request, response) => {
        const {name, functionn, department, email, phone} = request.body;
        const photo = `http://localhost:3333/files/${request.file.filename}`;
        const funcionario = await funcionarioService.execute({name, functionn, department, email, phone, photo}); // passa name, email and  password para função execute do service.
        
        return response.json(funcionario);
});

funcionariosRouter.get('/', async (request, response) => {
        const funcionariosRepository = getRepository(Funcionario);
        const funcionario = await funcionariosRepository.find();

        return response.json(funcionario);
});

funcionariosRouter.get('/:id', async (request, response) => {
        try {
        const {id} = request.params;
        const funcionariosRepository = getRepository(Funcionario);
        const funcionario = await funcionariosRepository.findOne( { id });

        return response.json(
                { 
                name: funcionario.name, 
                department: funcionario.department, 
                email: funcionario.email, 
                phone: funcionario.phone
        });
        }
        catch(err) {
                throw new AppError('Não foi possivel localizar o funcionario)', 404);
        }
});

//DELETAR
funcionariosRouter.delete('/:id', async(request: Request, response: Response) => {
        try {

        
        const {id} = request.params;
        const funcionariosRepository = getRepository(Funcionario);
        const funcionario = await funcionariosRepository.findOne({ id });
        funcionariosRepository.remove(funcionario);
    
        response.json({ok: true});
        }
        catch(err) {
                throw new AppError('Não foi possivel deletar o funcionario, favor rever o id)', 400);
        }
});

//ALTERAR
funcionariosRouter.patch('/:id', upload.single('image'), async(request: Request, response: Response) => { 
        try {
                const { id } = request.params;
                const funcionariosRepository = getRepository(Funcionario);
                const funcionario = await funcionariosRepository.findOne({ id });
         
                const {name, functionn, department, email, phone} = request.body;
                const photo = `http://localhost:3333/files/${request.file.filename}`;
        
                funcionario.name = name;
                funcionario.function = functionn;
                funcionario.department = department;
                funcionario.email = email;
                funcionario.phone = phone;
                funcionario.photo = photo;
        
                await funcionariosRepository.save(funcionario); // Salva no banco de dados     
                return response.json(funcionario);
        }
        catch(err) {
                throw new AppError('Não foi possivel localizar o funcionario)', 404);
        }
        
});

// LIKES E DISLIKES

funcionariosRouter.post('/likes/:id', async(request: Request, response: Response) => {
        try {
                const {id} = request.params;
                const funcionariosRepository = getRepository(Funcionario);
                const funcionario = await funcionariosRepository.findOne(id);
                funcionario.likes =  funcionario.likes + 1;
                await funcionariosRepository.save(funcionario);

                return response.json(funcionario);
        }
        catch(err) {
                throw new AppError('Não foi possivel curtir, favor rever o id)', 401);
        }
});

funcionariosRouter.post('/dislikes/:id', async(request: Request, response: Response) => {
        try {
                const {id} = request.params
                const funcionariosRepository = getRepository(Funcionario);
                const funcionario = await funcionariosRepository.findOne(id);
                funcionario.likes =  funcionario.likes - 1;
                await funcionariosRepository.save(funcionario);

                return response.json(funcionario);
        }
        catch(err) {
                throw new AppError('Não foi possivel descurtir, favor rever o id)', 401);
        }
});

export default funcionariosRouter;
