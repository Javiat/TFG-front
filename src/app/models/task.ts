
export class Task{
    constructor(
        public _id:string,
        public title:string,
        public localizacion:string,
        public description:string,
        public start:String,
        public end:String,
        public duration:number,
        public type:string,
        public colocado:Boolean,
        public color:string,
        public user:string
    ){}
}