import express from 'express';
import HttpStateCodes from '../../utils/http-state-codes';
import NoSQLWrapper from '../../data/interfaces/data-sources/no-sql-wrapper';
import User from '../../domain/models/User';

const UserRouter = (db: NoSQLWrapper) => {
    // routing
    const router = express.Router();
    router.get('/user', async(request, response) => {
        const resultDbList = await db.FindAllUsers();
        response.status(HttpStateCodes.OK).json({response: resultDbList});
    });
    router.post('/user', async(request, response) => {
        const user = request.body;
        const resultDb = await db.CreateUser(user);
        response.status(HttpStateCodes.OK).json({response: resultDb});
    })
    router.delete('/user/:id', async(request, response) => {
        const {id}=request.params;
        try {
            const result = await db.DeleteUsers(id);
            result
            ? response.status(HttpStateCodes.OK).json({ message: 'Successfully deleted user with id ${id}'})
            : response.status(HttpStateCodes.NOT_FOUND).json({ error: 'User with id: ${id} not deleted'});
        }catch (error: any) {
            console.error(error.message);
            response.status(HttpStateCodes.BAD_REQUEST).json({ error: error.message });
        }
    })
    router.put('/user/:id', async(request, response) => {
        const id = request?.params?.id;
        try {
            const updateDates: User = request.body as User;
            const result = await db.UpdateUsers(id,updateDates);
            result
            ? response.status(HttpStateCodes.OK).json({ message:'Successfully updated user with id ${id}'})
            : response.status(HttpStateCodes.NOT_FOUND).json({ error:'User with id: ${id} not updated'});
        }catch (error: any) {
            console.error(error.message);
            response.status(400).json({error: error.message});
        }
    })
    return router;
}
export default UserRouter;