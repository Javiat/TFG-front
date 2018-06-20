
export class Partida{
    constructor(
        public _id:string,
        public inicio:Date,
        public fin:Date,
        public duracion:Number,
        public user:string,
        public bien_planificadas:Array<String>,
        public mal_planificadas:Array<String>,
        public nivel:Number,
        public puntos:Number
    ){}
}