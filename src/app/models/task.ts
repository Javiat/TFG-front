
export class Task{
    constructor(
        public _id:string,
        public title:string,
        public localizacion:string,
        public description:string,
        public start:Date,
        public end:Date,
        public duration:string,
        public type:string,
        public user:string
    ){}
}