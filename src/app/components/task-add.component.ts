import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';
import {User} from '../models/user';
@Component({
    selector:'task-add',
    templateUrl:'../views/task-add.html',
    providers:[UserService,TaskService]
})

export class TaskAddComponent implements OnInit{
    public titulo:string;
    public task:Task;
    public user:User;
    public identity;
    public url:String;
    public id;
    public alertMessage;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService,
        private _taskService:TaskService
    ){
        this.titulo='Crear una nueva tarea';
        this.identity=this._userService.getIdentity();
        this.task=new Task('','','','','','','','');
        this.url=GLOBAL.url;
        this.id=this._userService.identity._id;
    }

    ngOnInit(){
        console.log('task-add.component cargado');
        //Conseguir el listado de tareas

    }
    onSubmit(){
        this._route.params.forEach((params:Params) => {
            let user_id=params['user'];
            this.task.user=user_id;
            this._taskService.addTask(this.task).subscribe(
                response=>{
                    if(!response.task){
                        this.alertMessage='Error en el servidor';
                    }else{
                        this.alertMessage='La tarea se ha creado correctamente';
                        this.task=response.task;
                        this._router.navigate(['/tasks']);
                    }
                },
                error=>{
                    var errorMessage=<any>error;
                    if(errorMessage!=null){
                      var body=JSON.parse(error._body);
                      this.alertMessage=body.message;
                    }
                }

            );
        });
        console.log(this.task);
    }
}