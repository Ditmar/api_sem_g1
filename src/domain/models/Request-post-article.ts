interface RequestPostArticle{
    id?: string;
    title:string;
    author:string;
    volume:string;
    date: string;
    year:number;
    disponible: string; //true false
    image:string; 

}
export default RequestPostArticle;