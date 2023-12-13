interface NoSQLWrapper {
    CreateUser: (user: any) => Promise<any>;
    FindAllUsers: () => Promise<any[]>;
  
    UpdateUsers: (id:any, data:any) => Promise<any>;
    DeleteUsers:(id:string) => Promise<any>;
    FindOneUser: (email:string, password: string) => Promise<any>;

    //articulo
    CreateArticle: (user: any) => Promise<any>;
    FindAllArticle: () => Promise<any[]>;

    //years
    FindAllYears: () => Promise<any[]>;
    FindAllYearsAvailable: () => Promise<any[]>;

    //volumen
    FindAllVolumesPerYear: (year: any) => Promise<any[]>;
    FindAllVolumenes: (page: any, limit: any) => Promise<any>;
}

export default NoSQLWrapper;