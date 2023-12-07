interface NoSQLWrapper {
    CreateUser: (user: any) => Promise<any>;
    FindAllUsers: () => Promise<any[]>;
    FindOneUser: (email:string, password: string) => Promise<any>;

    //articulo
    CreateArticulo: (user: any) => Promise<any>;
    FindAllArticulo: () => Promise<any[]>;

    //years
    FindAllYears: () => Promise<any[]>;
    FindAllYearsDisponibles: () => Promise<any[]>;

    //volumen
    FindAllVolumenesPorAnio: (year: any) => Promise<any[]>;
    FindAllVolumenes: (page: any, limit: any) => Promise<any>;
}
export default NoSQLWrapper;