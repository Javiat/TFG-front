import {Component,OnInit,ViewChild,AfterViewInit,Input} from '@angular/core';
import {  OnChanges, SimpleChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpModule }      from '@angular/http';
import {GLOBAL} from '../services/global';
import {Calendar} from '../services/calendar';
import {UserService} from '../services/user.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import { Partida } from '../models/partida';
import {PartidaService} from '../services/partidas.services';
import {TaskService} from '../services/task.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CalendarComponent, FullCalendarModule } from 'ng-fullcalendar';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { Options } from 'fullcalendar';
import {TimerComponent} from './timer';
import * as $ from 'jquery';
import 'jquery';


var moment=require('moment');
@Component({
    selector:'game',
    templateUrl:'../views/game.html',
    providers:[UserService,TaskService,PartidaService]
})

export class GameComponent implements OnInit{
    public title:string;
    public tasks=[];
    public mal_planificadas=[];
    public bien_planificadas=[];
    public task:Task;
    public partida:Partida;
    public identity;
    public url:String;
    public id;
    public user:User;
    public alertMessage;
    public type;
    public filesToUpload:Array<File>;
    public calendarOptions: Options;
    displayEvent: any;
    public events = new Array();
    public minutes: number;
    public seconds: number;
    public puntos:number;
    public isPaused: boolean;
    public nivel:string;
    constructor(
        private _router:Router,
        private _route:ActivatedRoute,
        private _userService:UserService,
        private _taskService:TaskService,
        private _partidaService:PartidaService,
        private httpService: HttpClient,
           
    ){
        this.title='Listado de tareas';
        this.task=new Task('','','','',null,null,null,'',null,'','');
        this.identity=this._userService.getIdentity();
        this.partida=new Partida('',null,null,'',this.identity._id,null,null,null,0);
        this.user=this.identity;
        this.url=GLOBAL.url;
        this.id=this._userService.identity._id;
        this.calendarOptions=Calendar;
        this.nivel=JSON.parse(localStorage.getItem('nivel'));;
    }
   
    ngOnInit(){
      $.getScript('../assets/js/script.js');
      this.getTasks();
       setTimeout(() => {
          
        }, 2000);
        
         var f_inicio=new Date();
         this.partida.inicio=f_inicio;
         this.minutes =JSON.parse(localStorage.getItem("minutes"));
         this.seconds = JSON.parse(localStorage.getItem("seconds"));
         console.log(localStorage);
        setInterval(() => this.tick(), 1000);
       
      }
    

   private tick(): void {
    localStorage.setItem('minutes',JSON.stringify(this.minutes));
    localStorage.setItem('seconds',JSON.stringify(this.seconds));
    if (!this.isPaused) {
       if (++this.seconds > 59) {
         this.seconds = 0;
         
         if (++this.minutes > 25) {
           this.minutes=0;
           this.seconds=0;
         }  
     }
    }
   }
   togglePause(): void {
    this.isPaused = !this.isPaused;
    
  }
  
     getTasks(){
        this._taskService.getTasksGame(this.id).subscribe(
        response=>{
            if(!response.tasks){
                this.alertMessage='Este usuario no tiene tareas';  
            }else{
              if(response.tasks){
                this.tasks=response.tasks;
                for(var i=0;i<this.tasks.length;i++){
                    this.events[i]={
                      id:this.tasks[i]._id,
                      title: this.tasks[i].title,
                      start:this.tasks[i].start,
                      end: this.tasks[i].end,
                      type:this.tasks[i].type,
                      description:this.tasks[i].description,
                      color:this.tasks[i].color,
                      localizacion:this.tasks[i],
                      colocado:this.tasks[i].colocado   
                    }
                    var type=this.events[i].type;
                   if(type=='solida trabajo' ||type=='solida personal' || type=='solida importante trabajo' || type=='solida importante personal' || type=='solida urgente trabajo'
                      ||type=='solida urgente personal'){
                      this.events[i].editable=false;
                   }  
                  }
              }else{
                console.log('Error');
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
        return this.events;
    }

    getTask(id){
          this._taskService.getTask(id).subscribe(
              response=>{
                  if(!response.task){
                  console.log('Este usuario no tiene tareas');        
                  }else{  
                      this.task=response.task;
                      console.log(this.task);
                  }
              },
              error=>{
                  var alertUpdate=<any>error;
                  if(alertUpdate!=null){
                      var body=JSON.parse(error._body);
                      
                  }
              }
          )
    }
    updateEvent(model: any) {
        
      model = {
        event: {
          id: model.event.id,
          start: model.event.start,
          end: model.event.end,
          title: model.event.title,
          type:model.event.type,
          colocad:model.event.colocado
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
   actualizar(){
    this._taskService.updateEvent(this.task._id,this.task).subscribe(
      response=>{
          if(!response.task){
              console.log('Error en el servidor');
          }else{
              console.log('La tarea se ha actualizado correctamente');
              this.task=response.task;
              
          }
      },
      error=>{
          var errorMessage=<any>error;
          if(errorMessage!=null){
            var body=JSON.parse(error._body);
            
          }
      }

  );
   }
  evaluar(){
        for(var i=0;i<this.tasks.length-1;i++){
          if(this.tasks[i].end!=null && this.tasks[i+1].start!=null){
            this.tasks.sort(function(a,b){
              return a.start.localeCompare(b.start);
            });
          }else{
            console.log('No se puede comparar');
          }
        }
        
       
        this.compararFechas();
        this.partida.puntos=this.puntos;
        this.partida.nivel=JSON.parse(localStorage.getItem('nivel'));
        localStorage.removeItem('nivel');
        console.log(this.partida);
        this.savePartida();
        this.onDeleteTask();
        localStorage.removeItem('minutes');
        localStorage.removeItem('seconds');
        this.togglePause();
        Calendar.events=[];
        $("#resultados").show();
        $("#tareas").hide();
    }
    savePartida(){
      var f=new Date();
      this.partida.fin=f;
      var fecha_inicio = moment(this.partida.inicio);
      var fecha_fin = moment(this.partida.fin);
      var totalMinutes = fecha_fin.diff(fecha_inicio, 'minutes');
      var totalSeconds = fecha_fin.diff(fecha_inicio, 'seconds');
      var clearMinutes = totalMinutes % 60;
      var clearSeconds=totalSeconds%60;
      this.partida.duracion=clearMinutes+':'+clearSeconds;
      this.partida.bien_planificadas=this.bien_planificadas;
      this.partida.mal_planificadas=this.mal_planificadas;
      this._partidaService.register(this.partida).subscribe(
        response=>{
            if(!response){
                console.log(response);
            }else{
                console.log(response);
            }
        },
        error=>{
            console.log('Error');
        }
      )
    }
    compararFechas(){
      this.puntos=100;
      for(var i=0;i<this.tasks.length-1;i++){
          var ciudad1=this.tasks[i].localizacion;
          var ciudad2=this.tasks[i+1].localizacion;
          var fecha_inicio = moment(this.tasks[i].end);
          var fecha_fin = moment(this.tasks[i+1].start);
          var totalHours = fecha_fin.diff(fecha_inicio, 'hours');
          var totalMinutes = fecha_fin.diff(fecha_inicio, 'minutes');
          var clearMinutes = totalMinutes % 60;
          console.log('Diferencia entre:'+this.tasks[i].title+" y "+this.tasks[i+1].title+" es: "+totalHours + " hours and " + clearMinutes + " minutes");
         
          if(totalMinutes<=29){
            console.log('tarea mal planificada');
            this.mal_planificadas.push(this.tasks[i]);
            this.mal_planificadas.push(this.tasks[i+1]);
            this.puntos-=5;
          }else{
            if(ciudad1=='Madrid'){
              if(ciudad2=='Londres' && totalHours>=3){
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
                console.log('Tarea bien planificada');
              }else if(ciudad2=='Lisboa' || ciudad2=='Barna' || ciudad2=='Bilbao' || ciudad2=='Valencia' || ciudad2=='Barcelona' && totalHours>=1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2=='Madrid'){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else{
                console.log('tarea mal planificada');
                this.mal_planificadas.push(this.tasks[i]);
                this.mal_planificadas.push(this.tasks[i+1]);
                this.puntos-=5;
              }
            }else if(ciudad1=='Londres'){
              if(ciudad2=='Madrid' && totalHours>=3){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2=='Lisboa' || ciudad2=='Barna' || ciudad2=='Bilbao' ||  ciudad2=='Barcelona' || ciudad2=='Valencia' && totalHours>=2){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2=='Londres'){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else{
                console.log('tarea mal planificada');
                this.mal_planificadas.push(this.tasks[i]);
                this.mal_planificadas.push(this.tasks[i+1]);
                this.puntos-=5;
              }
            }else if(ciudad1=='Lisboa'){
              if(ciudad2=='Londres' && totalHours>=2){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2=='Madrid' || ciudad2=='Barna' || ciudad2=='Bilbao' || ciudad2=='Valencia' && totalHours>=1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2==ciudad1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else{
                console.log('tarea mal planificada');
                this.mal_planificadas.push(this.tasks[i]);
                this.mal_planificadas.push(this.tasks[i+1]);
                this.puntos-=5;
              }
            }else if(ciudad1=='Barna'){
              if(ciudad2=='Londres' && totalHours>=2){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2=='Lisboa' || ciudad2=='Madrid' || ciudad2=='Bilbao' || ciudad2=='Barcelona' || ciudad2=='Valencia' && totalHours>=1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2==ciudad1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else{
                console.log('tarea mal planificada');
                this.mal_planificadas.push(this.tasks[i]);
                this.mal_planificadas.push(this.tasks[i+1]);
                this.puntos-=5;
              }
            }else if(ciudad1=='Bilbao'){
              if(ciudad2=='Londres' && totalHours>=2){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2=='Lisboa' || ciudad2=='Barna' || ciudad2=='Madrid' || ciudad2=='Barcelona' || ciudad2=='Valencia' && totalHours>=1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2==ciudad1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else{
                console.log('tarea mal planificada');
                this.mal_planificadas.push(this.tasks[i]);
                this.mal_planificadas.push(this.tasks[i+1]);
                this.puntos-=5;
              }
            }else if(ciudad1=='Valencia'){
              if(ciudad2=='Londres' && totalHours>=2){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2=='Lisboa' || ciudad2=='Barna' || ciudad2=='Bilbao' || ciudad2=='Barcelona' || ciudad2=='Madrid' && totalHours>=1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2==ciudad1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else{
                console.log('tarea mal planificada');
                this.mal_planificadas.push(this.tasks[i]);
                this.mal_planificadas.push(this.tasks[i+1]);
                this.puntos-=5;
              }
            }else if(ciudad1=='Barcelona'){
              if(ciudad2=='Londres' && totalHours>=2){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2=='Lisboa' || ciudad2=='Barna' || ciudad2=='Bilbao' || ciudad2=='Valencia' || ciudad2=='Madrid' && totalHours>=1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else if(ciudad2==ciudad1){
                console.log('Tarea bien planificada');
                this.bien_planificadas.push(this.tasks[i]);
                this.bien_planificadas.push(this.tasks[i+1]);
              }else{
                console.log('tarea mal planificada');
                this.mal_planificadas.push(this.tasks[i]);
                this.mal_planificadas.push(this.tasks[i+1]);
                this.puntos-=5;
              }
            }
          }
          
        }
    }
    onDeleteTask(){
      for(var i=0;i<this.events.length;i++){
        var id=this.events[i].id;
        this._taskService.deleteTask(id).subscribe(
          response=>{
              if(!response.task){
                  this.alertMessage='Error en el servidor';
              }else{ 
                if(response.task){
                  console.log(response.task);
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
      
}
