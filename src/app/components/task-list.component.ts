import {Component,OnInit,ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { EventService } from '../services/event.service';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import {TaskService} from '../services/task.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
@Component({
    selector:'task-list',
    templateUrl:'../views/task-list.html',
    providers:[UserService,TaskService,EventService]
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
    calendarOptions: Options;
    displayEvent: any;
    events = null;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService,
        private _taskService:TaskService,
        private eventService:EventService

    ){
        this.title='Tareas';
        this.identity=this._userService.getIdentity();
        this.url=GLOBAL.url;
        this.id=this._userService.identity._id;

    }

    ngOnInit(){
        console.log('task-list.component.ts cargado');
        //Conseguir el listado de tareas
        this.calendarOptions = {
          editable: true,
          eventLimit: false,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
          },
          events:[]
        }; 
       this.getTasks();
    }

    getTasks(){
      this._taskService.getTasks(this.id).subscribe(
        response=>{
            if(!response.tasks){
                this.alertMessage='Este usuario no tiene tareas';
               
            }else{
                this.tasks=response.tasks;
                this.events=[this.tasks.length];
                for(var i=0;i<this.tasks.length;i++){
                  this.events[i]={
                    id:this.tasks[i]._id,
                    title: this.tasks[i].title,
                    start:this.tasks[i].start,
                    end: this.tasks[i].end,
                    type:this.tasks[i].type,
                  }
                  if(this.events[i].type=='liquida'){
                    this.events[i].color='#4D7FC2'
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
              this.alertMessage=body.message;
            }
        }
    )  
    }
    //  loadevents() {
    // //   this.events=[this.tasks.length];
    // //   console.log(this.events);
    // //   for(var i=0;i<this.tasks.length;i++){
    // //     this.events[i]={
    // //       id:this.tasks[i]._id,
    // //       title: this.tasks[i].title,
    // //       start:this.tasks[i].fecha_inicio,
    // //       end: this.tasks[i].fecha_fin,
    // //       type:this.tasks[i].type,
    // //       duration:this.tasks[i].duration
    // //     }
    // //   }
          
    //   //   console.log(this.events);
    //   this.events= [
    //     {
    //         start: '2018-04-04',
    //         end: '2018-04-04',
    //         overlap: false,
    //         rendering: 'background',
    //         color: '#257e4a'
    //     },
    //     {
    //        start: '2018-04-05',
    //          end: '2018-04-05',
    //         overlap: false,
    //         rendering: 'background',
    //         color: '#ff9f89'
    //     }]
    //   }
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
                  this.alertMessage='Error en el servidor';
              }else{
                  console.log('La tarea se ha actualizado correctamente');
                  this.getTasks();
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
        this.displayEvent = model; 
       }
    
}