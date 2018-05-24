import {Component,OnInit,ViewChild,AfterViewInit,Input} from '@angular/core';
import {  OnChanges, SimpleChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { EventService } from '../services/event.service';
import { HttpModule }      from '@angular/http';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import {TaskService} from '../services/task.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CalendarComponent, FullCalendarModule } from 'ng-fullcalendar';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { Options } from 'fullcalendar';
import * as $ from 'jquery';
import 'jquery';
var moment=require('moment');
@Component({
    selector:'game',
    templateUrl:'../views/game.html',
    providers:[UserService,TaskService,EventService]
})

export class GameComponent implements OnInit ,AfterViewInit {
    public title:string;
    public tasks=[];
    public task:Task;
    public game=[];
    public identity;
    public url:String;
    public id;
    public user:User;
    public alertMessage;
    public type;
    public filesToUpload:Array<File>;
    calendarOptions: Options;
    calendar:FullCalendarModule;
    displayEvent: any;
    public events =[];
    public minutes: number;
    public seconds: number;

    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    constructor(
        private _router:Router,
        private _route:ActivatedRoute,
        private _userService:UserService,
        private _taskService:TaskService,
        private eventService:EventService,
        private httpService: HttpClient      
    ){
        this.title='Listado de tareas';
        this.task=new Task('','','','',null,null,null,'',null,'','');
        this.identity=this._userService.getIdentity();
        this.user=this.identity;
        this.url=GLOBAL.url;
        this.id=this._userService.identity._id;
        
    }
    ngAfterViewInit(){
     this.getTasks(); 
    }
    ngOnInit(){
        console.log('game.component.ts cargado');
        
        $.getScript('../assets/js/script.js');
        
        this.calendarOptions = {
          locale:'es',
         header: {
           left: 'prev,next',
           center: 'title',
           right: 'month,agendaWeek,agendaDay',
           
       },
       
       events:[],
       businessHours: {
         start: '09:00', // hora final
         end: '21:00', // hora inicial
         dow: [ 1, 2, 3, 4, 5 ],
       },
       buttonText: {
        month:'Mes',
        week:'Semana',
        day:'Dia'
       },

       editable: true,
       eventLimit: false,
       eventConstraint: "businessHours",
       defaultView:'agendaWeek',
       themeSystem: 'bootstrap3',
       columnFormat:'dddd D' ,
       firstDay:1,
       allDaySlot:false
       };

       this.resetTimer();
        setInterval(() => this.tick(), 1000);
      }
    

    
  resetTimer(): void {
    this.minutes = 24;
    this.seconds = 59;
   
  }

  private tick(): void {
      if (--this.seconds < 0) {
        this.seconds = 59;
        if (--this.minutes < 0) {
          this.minutes=0;
          this.seconds=0;
        }  
    }
  }

    getTasks(){
      this._taskService.getTasksGame(this.id).subscribe(
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
                      color:this.tasks[i].color,      
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
              this.alertMessage=body.message;
            }
        }
        )
    }

    evaluar(){
        var veces=1;
        var f=new Date();
        var diapararestar=f.getUTCDay();
        if(diapararestar==0){
           var dias1=(-6);        
        }else{
           var dias1=(diapararestar-1)*(-1);        
        }
        f.setDate(f.getDate() + dias1);
        var contador=0;
        //this.compararFechas(f,veces,contador);
        this.actualizarPartidas();
        this.tasks.sort(function(a,b){
          return a.start.localeCompare(b.start);
        });
        console.log(this.tasks);
        this.onDeleteTask();
    }
  

    compararFechas(f,veces,contador){
      var prueba=[];
      for(var i=0;i<this.tasks.length;i++){
        if(f.getDay()==moment(this.tasks[i].start).day()){
          
          this.game[contador]=this.tasks[i];
          contador++;
         
        }
      }
      
      f.setDate(f.getDate()+1);
      veces+=1;
      if(veces<7){
        this.compararFechas(f,veces,contador);
      }
      
    }
    actualizarPartidas(){
      this._userService.updatePartidas(this.identity).subscribe(
        response=>{
          if(!response){
            this.alertMessage="Error en el servidor";
          }else{
            
            this.user=response.userUpdated;
            localStorage.setItem('identity',JSON.stringify(this.user));
            document.getElementById("partidas").innerHTML=JSON.stringify(this.user.partidas);
            
          }
        },error=>{
          var errorMessage=<any>error;
          if(errorMessage!=null){
            var body=JSON.parse(error._body);
            this.alertMessage=body.message;
          }
        }
      )
    }
    onDeleteTask(){
      for(var i=0;i<this.events.length;i++){
        var id=this.events[i].id;
        this._taskService.deleteTask(id).subscribe(
          response=>{
            console.log(response);
              if(!response.task){
                  this.alertMessage='Error en el servidor';
              }else{ 
                console.log(response.task);
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

      clickButton(model: Task) {
        this.displayEvent = model;
      }
      dayClick(model: Task) {
        console.log(model);
      }
      
      eventClick(model: any) {
        var type=model.event.type;
       
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
              type:model.event.type,
              constraint:false
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
        
       }
}