import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { EventService } from '../services/event.service';
import {TaskService} from '../services/task.service';
import {UserService} from '../services/user.service';
import { Task } from '../models/task';
import { User } from '../models/user';
declare var jQuery:any;
declare var $:any;
declare var fn:any;

@Component({
    selector:'home',
    templateUrl:'../views/home.html'
})

export class HomeComponent implements OnInit{
    public title:string;
    public tasks:Task[];
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
        //Conseguir el listado de tareas
    }

    juego(){
        this.identity=this._userService.getIdentity();
        this.eventService.getEvents().subscribe(data => { 
            this.tasks=data;
        })
            for(var i=0;i<this.tasks.length;i++){
                     this.tasks[i].user=this.identity._id;
                     this._taskService.addTask(this.tasks[i]).subscribe(
                       response=>{
                           if(!response.task){
                               console.log(response);
                           }else{ 
                               console.log(response.task);
                           }
                       },
                       error=>{
                           console.log('Error');
                      }
        
                   );
                   }
            this._router.navigate(['/game']);
                   
        
        
        
    }
}