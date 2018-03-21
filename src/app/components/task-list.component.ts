import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import {TaskService} from '../services/task.service';

@Component({
    selector:'task-list',
    templateUrl:'../views/task-list.html',
    providers:[UserService,TaskService]
})

export class TaskListComponent implements OnInit{
    public title:string;
    public tasks:Task[];
    public identity;
    public url:String;
    public id;
    public user:User;
    public alertMessage;
    public type;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService,
        private _taskService:TaskService

    ){
        this.title='Tareas';
        this.identity=this._userService.getIdentity();
        this.url=GLOBAL.url;
        this.id=this._userService.identity._id;

    }

    ngOnInit(){
        console.log('task-list.component.ts cargado');
        //Conseguir el listado de tareas
        this._taskService.getTasks(this.id).subscribe(
            response=>{
                if(!response.tasks){
                    this.alertMessage='Este usuario no tiene tareas';
                   
                }else{
                    this.tasks=response.tasks;
                }
            },
            error=>{
                var errorMessage=<any>error;
                if(errorMessage!=null){
                  var body=JSON.parse(error._body);
                  this.alertMessage=body.message;
                }
            }
        )
        
    }
    
}