import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

declare var jQuery:any;
declare var $:any;
declare var fn:any;

@Component({
    selector:'home',
    templateUrl:'../views/home.html'
})

export class HomeComponent implements OnInit{
    public title:string;
    

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
    ){
        this.title='APLICACIÓN GESTIÓN DEL TIEMPO';
    }

    ngOnInit(){
        console.log('home.component.ts cargado');

        //Conseguir el listado de tareas

        
    }
}