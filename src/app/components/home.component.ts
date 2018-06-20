import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PartidaService} from '../services/partidas.services';
import {TaskService} from '../services/task.service';
import {UserService} from '../services/user.service';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Partida } from '../models/partida';
import { duration } from 'moment';
declare var jQuery:any;
declare var $:any;
declare var fn:any;

@Component({
    selector:'home',
    templateUrl:'../views/home.html',
    providers:[UserService,TaskService,PartidaService]
})

export class HomeComponent implements OnInit{
    public title:string;
    public partida:Partida;
    public identity;
    public minutes:number;
    public seconds:number;
    public nivel:number;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _taskService:TaskService,
        private _userService:UserService,
        private _partidaService:PartidaService
    ){
        this.title='APLICACIÓN GESTIÓN DEL TIEMPO';
        
    }

    ngOnInit(){
        console.log('home.component.ts cargado');
        $.getScript('../assets/js/script.js');
        this.identity=this._userService.getIdentity();
        console.log(localStorage);
        localStorage.removeItem('minutes');
        localStorage.removeItem('seconds');
        console.log(localStorage);
    }

    solucion_inicial(nivel){
        var seconds=0;
        var minutes=0;
        this.identity=this._userService.getIdentity();
        localStorage.setItem('minutes',JSON.stringify(minutes));
        localStorage.setItem('seconds',JSON.stringify(seconds));
        localStorage.setItem('nivel',JSON.stringify(nivel));
        this._taskService.solucion_inicial(this.identity._id,nivel).subscribe(
            response=>{
                if(!response){
                    console.log(response);
                }else{
                    if(!response.tasks){
                        console.log('Error');
                    }else{
                        if(response.tasks){
                            console.log(response);
                            this._router.navigate(['/game'])
                        }else{
                            console.log('Error');
                        }
                        
                    }
                    
                }
                },
                error=>{
                    console.log('Error');
                }
        ); 
    }   
       
        caso_base(nivel){
            var minutes=0;
            var seconds=0;
            this.identity=this._userService.getIdentity();
            localStorage.setItem('minutes',JSON.stringify(minutes));
            localStorage.setItem('seconds',JSON.stringify(seconds));
            this._taskService.caso_base(this.identity._id,nivel).subscribe(
                response=>{
                    if(!response){
                        console.log(response);
                    }else{ 
                        if(response.tasks){
                            console.log(response);
                            this._router.navigate(['/game'])
                        }else{
                            console.log('Error');
                        }
                        
                    }
                    },
                    error=>{
                        console.log('Error');
                    }
                    
            );
            
        }   
}