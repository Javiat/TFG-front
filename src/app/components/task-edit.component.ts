import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
    selector:'task-edit',
    templateUrl:'../views/task-edit.html',
    providers:[UserService,TaskService]
})

export class TaskEditComponent implements OnInit{
    public titulo:string;
    public task:Task;
    public task_update:Task;
    public user:User;
    public identity;
    public url:String;
    public id;
    public alertUpdate;
    public is_edit;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService,
        private _taskService:TaskService
    ){
        this.titulo='Editar la tarea';
        this.identity=this._userService.getIdentity();
        this.url=GLOBAL.url;
        this.is_edit=true;
        this.task=new Task('','','',null,null,'','','');
    }

    ngOnInit(){
        console.log('task-edit.component cargado');
        //Conseguir la tarea
        this.getTask();

    }

    getTask(){
        this._route.params.forEach((params:Params)=>{
            let id=params['id'];
            this._taskService.getTask(id).subscribe(
                response=>{
                    if(!response.task){
                        console.log('Este usuario no tiene tareas');
                       
                    }else{
                        
                        this.task=response.task;
                    }
                },
                error=>{
                    var alertUpdate=<any>error;
                    if(alertUpdate!=null){
                        var body=JSON.parse(error._body);
                        this.alertUpdate=body.message;
                    }
                }
            )
        });
    }
    onSubmit(){
        this._route.params.forEach((params:Params) => {
            let id=params['id'];
            this._taskService.updateTask(id,this.task).subscribe(
                response=>{
                    if(!response.task){
                        this.alertUpdate='Error en el servidor';
                    }else{
                        this.alertUpdate='La tarea se ha actualizado correctamente';
                        this.task=response.task;
                        this._router.navigate(['/tasks']);
                    }
                },
                error=>{
                    var errorMessage=<any>error;
                    if(errorMessage!=null){
                      var body=JSON.parse(error._body);
                      this.alertUpdate=body.message;
                    }
                }

            );
        });
    }
    onDeleteTask(id){
        this._taskService.deleteTask(id).subscribe(
            response=>{
                if(!response.task){
                    this.alertUpdate='Error en el servidor';
                }
                this._router.navigate(['/tasks']);
            },
            error=>{
                var errorMessage=<any>error;
                    if(errorMessage!=null){
                      var body=JSON.parse(error._body);
                      this.alertUpdate=body.message;
                    }
            }
        )
        
    }
}