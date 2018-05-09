import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import { CalendarComponent, FullCalendarModule } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
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
    public calendarOptions: Options;
    public tasks:Task[];
    public events=[];
    displayEvent: any;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService,
        private _taskService:TaskService
    ){
        this.titulo='Crear una nueva tarea';
        this.identity=this._userService.getIdentity();
        this.task=new Task('','','','Agenda Personal',null,null,null,'',null,'','');
        this.url=GLOBAL.url;
        this.id=this._userService.identity._id;
              
    }

    ngOnInit(){
        console.log('task-add.component cargado');
        //Conseguir el listado de tareas
        this.calendarOptions = {
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay,listMonth'
          },
          events:[],
          
          editable: true,
          eventLimit: false,
          
          defaultView:'agendaWeek',
          
          firstDay:1
          };
          this.getTasks();
    }
    getTasks(){
        this._taskService.getTasks(this.id).subscribe(
          response=>{
              if(!response.tasks){
                  console.log('Este usuario no tiene tareas');  
              }else{
                  this.tasks=response.tasks;
                  this.events.length=this.tasks.length;
                    for(var i=0;i<this.tasks.length;i++){
                        this.events[i]={
                            id:this.tasks[i]._id,
                            title: this.tasks[i].title,
                            start:this.tasks[i].start,
                            end: this.tasks[i].end,
                            type:this.tasks[i].type,
                            escription:this.tasks[i].description
                        }
                        if(this.events[i].type=='liquida'){
                            this.events[i].color='#53B4BD'
                        }else{
                            this.events[i].color='#C23E3D'
                        }
                        }
                    
              }
          },
          error=>{
              var errorMessage=<any>error;
              if(errorMessage!=null){
                var body=JSON.parse(error._body);
                
              }
          }
          )
              
      }
    onSubmit(){
        this._route.params.forEach((params:Params) => {
            let user_id=params['user'];
            this.task.user=user_id;
            console.log(params);
            this._taskService.addTask(this.task).subscribe(
                response=>{
                    if(!response.task){
                        this.alertMessage='Error en el servidor';
                    }else{
                        this.alertMessage='La tarea se ha creado correctamente';
                        this.task=response.task;
                        this._router.navigate(['/agenda']);
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