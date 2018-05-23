import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { EventService } from '../services/event.service';
import {TaskService} from '../services/task.service';
import {UserService} from '../services/user.service';
import { Task } from '../models/task';
import { User } from '../models/user';
import { duration } from 'moment';
declare var jQuery:any;
declare var $:any;
declare var fn:any;

@Component({
    selector:'home',
    templateUrl:'../views/home.html'
})

export class HomeComponent implements OnInit{
    public title:string;
    
    public identity;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private eventService:EventService,
        private _taskService:TaskService,
        private _userService:UserService
    ){
        this.title='APLICACIÓN GESTIÓN DEL TIEMPO';
    }

    ngOnInit(){
        console.log('home.component.ts cargado');
        $.getScript('../assets/js/script.js'); 
        
    }

    solucion_inicial(){
        this.identity=this._userService.getIdentity();
        this._taskService.getTaskJuego(this.identity._id).subscribe(
            response=>{
                if(!response){
                    console.log(response);
                }else{ 
                    console.log(response);   
                }
                },
                error=>{
                    console.log('Error');
                }
        );
        
        window.location.href = '/game';
    }   
       
        caso_base(){
            this.identity=this._userService.getIdentity();
            this._taskService.caso_base(this.identity._id).subscribe(
                response=>{
                    if(!response){
                        console.log(response);
                    }else{ 
                        console.log(response);
                       
                    }
                    },
                    error=>{
                        console.log('Error');
                    }
                    
            );
            window.location.href = '/game';
        }   
}