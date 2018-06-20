import {Component,OnInit,ViewChild,AfterViewInit,Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../services/global';
import {Calendar} from '../services/calendar'; 
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import { forEach } from '@angular/router/src/utils/collection';
import { CalendarComponent, FullCalendarModule } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
var moment=require('moment');
@Component({
    selector:'taskgame-edit',
    templateUrl:'../views/task-edit.html',
    providers:[UserService,TaskService]
})

export class TaskGameEditComponent implements OnInit {
    public titulo:string;
    public task:Task;
    public task_update:Task;
    public user:User;
    public identity;
    public url:String;
    public id;
    public alertUpdate;
    public is_edit;
    public calendarOptions: Options;
    public tasks:Task[];
    public events=new Array();
    displayEvent: any;
    public minutes: number;
    public seconds: number;
   
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService,
        private _taskService:TaskService
    ){
        this.titulo='Editar la tarea';
        this.identity=this._userService.getIdentity();
        this.id=this.identity._id;
        this.url=GLOBAL.url;
        this.is_edit=true;
        this.tasks=[];
        this.task=new Task('','','','Agenda Personal',null,null,null,'',null,'','');
        this.calendarOptions=Calendar;
         
    }
    
    ngOnInit(){

        console.log('task-edit.component cargado');
        this.getTask();
         setTimeout(() => {
            
          }, 1000);
        this.getTasks();
        this.minutes =JSON.parse(localStorage.getItem("minutes"));
        this.seconds = JSON.parse(localStorage.getItem("seconds"));
        console.log(localStorage);
        setInterval(() => this.tick(), 1000); 
        
    }
     resetTimer(): void {
        
   
   }

   private tick(): void {
        localStorage.setItem('minutes',JSON.stringify(this.minutes));
        localStorage.setItem('seconds',JSON.stringify(this.seconds));
        if (++this.seconds > 59) {
         this.seconds = 0;
         
         if (++this.minutes > 25) {
           this.minutes=0;
           this.seconds=0;
         }  
     }
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
                        var fecha_inicio=moment(this.task.start).format("YYYY-MM-DDThh:mm");
                        var fecha_fin=moment(this.task.end).format("YYYY-MM-DDThh:mm");
                        
                        this.task.start=fecha_inicio;
                        this.task.end=fecha_fin;
                        console.log(this.task);
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
    getTasks(){
        this._taskService.getTasksGame(this.id).subscribe(
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
                            description:this.tasks[i].description,
                            color:this.tasks[i].color
                        }
                        var type=this.events[i].type;
                        if(type=='solida trabajo' ||type=='solida personal' || type=='solida importante trabajo' || type=='solida importante personal' || type=='solida urgente trabajo'
                           ||type=='solida urgente personal'){
                           this.events[i].editable=false;
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
            let id=params['id'];
            this._taskService.updateTask(id,this.task).subscribe(
                response=>{
                    if(!response.task){
                        this.alertUpdate='Error en el servidor';
                    }else{
                        this.alertUpdate='La tarea se ha actualizado correctamente';
                        this.task=response.task;
                        this._router.navigate(['/game'])

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
                this._router.navigate(['/game']);
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
    clickButton(model: Task) {
        this.displayEvent = model;
      }
      dayClick(model: Task) {
        console.log(model);
      }
      
      eventClick(model: any) {
       
        model = {
          event: {
            id: model.event.id,
            start: model.event.start,
            end: model.event.end,
            title: model.event.title,
            type:model.event.type,
            duration:model.event.duration
            // other params
          },
        }
        this.displayEvent = model;
      }
      updateEvent(model: any) {
        model = {
          event: {
            id: model.event.id,
            start: model.event.start,
            end: model.event.end,
            title: model.event.title,
            type:model.event.type
            // other params
          },
          duration: {
            _data: model.duration._data
          }  
        }

        this._taskService.updateEvent(model.event.id,model.event).subscribe(
          response=>{
              if(!response.task){
                  this.alertUpdate='Error en el servidor';
              }else{
                  console.log('La tarea se ha actualizado correctamente');
                  
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
        this.displayEvent = model; 
       }
}