import server from './server'
import UserRouter from './presentation/routers/user-router';
import ArticuloRouter from './presentation/routers/articulo-router';
import VolumenRouter from './presentation/routers/volumenes-route';
import YearRouter from './presentation/routers/year-router';
import { MongoClient } from 'mongodb';
import NoSQLWrapper from './data/interfaces/data-sources/no-sql-wrapper';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//mongo
const getMongoDBClient = async (): Promise<NoSQLWrapper> => {
    //mongodb://admin:password@localhost:27017/db
    const stringConnection = `mongodb://${process.env.API_MONGO_USERNAME}:${process.env.API_MONGO_PASSWORD}@localhost:27017`
    const uri = stringConnection;
    const client = new MongoClient(uri);

    client.connect();
    const database = process.env.API_MONGO_DBNAME;
    
    const db = client.db(database);
    const CreateUser = async (user: any): Promise<any> => {
        const result = await db.collection('users').insertOne(user);
        console.log(`New user created with the following id: ${result.insertedId}`);
        return {
            acknowledged: result.acknowledged,
            insertedId: result.insertedId,
        };
    }
    const FindAllUsers = async (): Promise<any[]> => {
        const result = await db.collection('users').find({}).toArray();
        return result;
    }

    const FindOneUser = async (email:string, password: string): Promise<any> => {
        const result = await db.collection('users').findOne({email,password});
        return result;
    }

    const CreateArticulo = async (articulo: any): Promise<any> => {
        const year = await db.collection('years').insertOne({
            year: articulo.year,
            disponible: articulo.disponible
        });
        const volumen = await db.collection('volumenes').insertOne({
            volumen: articulo.volumen
        });
        // para que no se inserte dos veces en la misma coleccion
        const yy = {
            id: year.insertedId,
            year: articulo.year,
            disponible: articulo.disponible
        };
        const vv  = {
            id: volumen.insertedId,
            volumen: articulo.volumen
        };
        delete articulo.year;
        delete articulo.disponible;
        delete articulo.volumen;
        articulo.year = yy;
        articulo.volumen = vv;
        const result = await db.collection('aticulos').insertOne(articulo);
        return {
            ...result
        };
    }

    const FindAllArticulo = async (): Promise<any[]> => {
        const result = await db.collection('aticulos').find().toArray();
        return result;
    }

    const FindAllYears = async (): Promise<any[]> => {
        const result = await db.collection('years').find().toArray();
        return result;
    }

    const FindAllYearsDisponibles = async (): Promise<any[]> => {
        const result = await db.collection('years').find({disponible: "true"}).toArray();
        return result;
    }

    const FindAllVolumenesPorAnio = async (year:any): Promise<any[]> => {
        const articulos = await db.collection('aticulos').find({'year.year':year}).toArray();
        const volumenes = [];
        for (let y = 0; y < articulos.length; y++) {
            const elm = articulos[y];
            volumenes.push({...elm.volumen, titulo_articulo: elm.titulo});
        }
        return volumenes;
    }

    const FindAllVolumenes = async (page:any, limit:any): Promise<any> => {
        const volumenes = db.collection('volumenes').find({}).skip(parseInt(page)).limit(parseInt(limit)).toArray();
        return volumenes;
    }

    return {
        CreateUser,
        FindAllUsers,
        CreateArticulo,
        FindAllArticulo,
        FindAllYears, 
        FindAllYearsDisponibles,
        FindAllVolumenesPorAnio,
        FindAllVolumenes,
        FindOneUser
    }
}

// const getPgDBClient = () => {

// }
// //todo homework
// const getSqlServerClient = () => {

// }


(async() => {
    const db = await getMongoDBClient();
    server.use('/api', UserRouter(db));
    server.use('/api', ArticuloRouter(db));
    server.use('/api', YearRouter(db));
    server.use('/api', VolumenRouter(db));
    const port = process.env.API_PORT || 3000;
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})();
// passport y jwt (json web token)
/// 