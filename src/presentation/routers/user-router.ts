import express from 'express';
import HttpStateCodes from '../../utils/http-state-codes';
import NoSQLWrapper from '../../data/interfaces/data-sources/no-sql-wrapper';
import * as jwt from 'jsonwebtoken';
import User from '../../domain/models/User';
import { verificarToken } from '../../utils/verificar-token';
const secretKey = process.env.SECRET_KEY || 'seminario';
const UserRouter = (db: NoSQLWrapper) => {
    // routing
    const router = express.Router();
    router.get('/user', verificarToken, async(request, response) => {
        const resultDbList = await db.FindAllUsers();
        console.log('aqui llega la peticion');
        response.status(HttpStateCodes.OK).json({response: resultDbList});
    });
    router.post('/user', async(request, response) => {
        const user: User = request.body
        const resultDb = await db.CreateUser(user);
        response.status(HttpStateCodes.OK).json({response: resultDb});
    })

    router.post('/login', async(request, response) => {
        const { email, password } = request.body;

        // Verifica las credenciales (en un escenario real, esto se haría comparando con una base de datos)
        const resultDb = await db.FindOneUser(email,password);
        if (resultDb && email === resultDb.email && password === resultDb.password) {
        // Crea un token JWT
            const token = jwt.sign({ email: resultDb.email }, secretKey, { expiresIn: '1h' });

            // Devuelve el token en la respuesta
            response.status(HttpStateCodes.OK).json({response: token});
        } else {
            response.status(HttpStateCodes.FORBIDDEN).json({response: 'No se encuentra el usuario'});
        }
    })
    return router;
}
export default UserRouter;