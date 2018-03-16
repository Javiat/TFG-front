
export class Task{
    constructor(
        public _id:string,
        public title:string,
        public description:string,
        public fecha_inicio:string,
        public fecha_fin:string,
        public duration:string,
        public type:string,
        public user:string
    ){}
}