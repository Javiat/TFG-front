import { Component,OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {GLOBAL} from '../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';

declare var jQuery:any;
declare var $:any;
declare var fn:any;
@Component({
  selector: 'register',
  templateUrl: '../views/register.html',
  providers:[UserService]
})
export class RegisterComponent implements OnInit{
    public title:string;
    

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
    ){
    }

    ngOnInit(){
        console.log('REGISTER.component.ts cargado');

        //Conseguir el listado de tareas

        
    }
}
