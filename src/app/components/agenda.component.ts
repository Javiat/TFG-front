import {Component,OnInit,ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import {TaskService} from '../services/task.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
@Component({
    selector:'agenda',
    templateUrl:'../views/agenda.html',
    providers:[UserService,TaskService]
})

export class AgendaComponent implements OnInit{
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
    public events = null;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService,
        private _taskService:TaskService,
        

    ){
        this.title='Listado de tareas';
        this.identity=this._userService.getIdentity();
        this.url=GLOBAL.url;
        this.id=this._userService.identity._id;

    }

    ngOnInit(){
        console.log('game.component.ts cargado');
        //Conseguir el listado de tareas
        this.calendarOptions = {
        locale:'es',
         header: {
           left: 'prev,next',
           center: 'title',
           right: 'month,agendaWeek,agendaDay',    
       },
       
       events:[],
       buttonText: {
        month:'Mes',
        week:'Semana',
        day:'Dia'
       },
       editable: true,
       eventLimit: false,
       defaultView:'agendaWeek',
       themeSystem: 'bootstrap3',
       columnFormat:'dddd D' ,
       firstDay:1,
       allDaySlot:false
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
                this.events.length=this.tasks.length;
                for(var i=0;i<this.tasks.length;i++){
                  this.events[i]={
                    id:this.tasks[i]._id,
                    title: this.tasks[i].title,
                    start:this.tasks[i].start,
                    end: this.tasks[i].end,
                    type:this.tasks[i].type,
                    description:this.tasks[i].description,
                    
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
              this.alertMessage=body.message;
            }
        }
    )  
    }
      loadevents() {
        // this.eventService.getEvents().subscribe(data => {
        //   this.events = data;
        // });
        console.log(this.events);
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