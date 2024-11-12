export class category{
    id !: number;
    type: string;
    name: string;
    description : string;

    constructor(type:string,name:string, description:string){
        this.type = type,
        this.name = name;
        this.description = description;
    }
}