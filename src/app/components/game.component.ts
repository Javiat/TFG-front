import {Component,OnInit,ViewChild,AfterViewInit} from '@angular/core';
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

@Component({
    selector:'game',
    templateUrl:'../views/game.html',
    providers:[UserService,TaskService,EventService]
})

export class GameComponent implements OnInit ,AfterViewInit {
    public title:string;
    public tasks:Task[];
    public task:Task;
    public game:Task[];
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
        this.url=GLOBAL.url;
        this.id=this._userService.identity._id;
        
    }
    ngAfterViewInit(){
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
    ngOnInit(){
        console.log('game.component.ts cargado');
        //Conseguir el listado de tareas 
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
       
      }
   
  //  solucion_inicial(){ 
  //   this.events=[this.tasks.length];
  //     for(var i=0;i<this.tasks.length;i++){
  //         this.events[i]={
  //           id:this.tasks[i]._id,
  //           title: this.tasks[i].title,
  //           start:this.tasks[i].start,
  //           end: this.tasks[i].end,
  //           type:this.tasks[i].type,
  //           escription:this.tasks[i].description
  //         }
  //         if(this.events[i].type=='liquida'){
  //           this.events[i].color='#53B4BD'
  //         }else{
  //           this.events[i].color='#C23E3D'
  //         }
  //       }
  //  }   
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
      this._router.navigate(['/home']);
         
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
        // leerArchivo(fileInput:any){
    //   var archivo = fileInput.target.files[0];
    //   if (!archivo) {
    //     return;
    //   }
    //   var lector = new FileReader();
    //   var contenido;
    //   lector.onload = function(archivo) {
    //     contenido = archivo.target;
        
    //   };

    //   lector.readAsText(archivo);
      
    // }
      // loadJson() {
      //    this.eventService.getEvents().subscribe(data => {
      //      this.events2=data;
      //    });
      //    console.log('Json original');
      //    console.log(this.events2);
      
      //   }
      //  addTasks(events:any[]){
      //     for(var i=0;i<events.length;i++){
      //       events[i].user=this.id;
      //       this._taskService.addTask(events[i]).subscribe(
      //         response=>{
      //             if(!response.tasks){
      //                 this.alertMessage='Error en el servidor';
      //             }else{
      //                 this.alertMessage='La tarea se ha creado correctamente';
      //                 this.tasks=response.tasks;
      //                 console.log(this.tasks);
      //             }
      //         },
      //         error=>{
      //             var errorMessage=<any>error;
      //             if(errorMessage!=null){
      //               var body=JSON.parse(error._body);
      //               this.alertMessage=body.message;
      //             }
      //         }

      //     );
      //     }
      // }
      // loadBBDD() {
      //   this.getTasks();
      // }
     
      
    // subirJson(fileInput:any){
    //   this.filesToUpload=<Array<File>>fileInput.target.files;
    //   console.log(this.filesToUpload);
    //   this.makeFileRequest(this.url+'upload-game/',[],this.filesToUpload)
    //   .then(
    //       (result:any)=>{
    //           console.log('json subido');
              
    //       }
    //   );
    //   // this._taskService.getFile('91fdtWqYwJhOWqFGvLFK6kKz.json').subscribe(
    //   //   response=>{
    //   //     console.log(response);
    //   //   },
    //   //   error=>{

    //   //   }
    //   // )                        
    // }
    // makeFileRequest(url:string,params:Array<string>,files:Array<File>){
    //   return new Promise(function(resolve,reject){
    //     var formData:any=new FormData();
    //     var xhr=new XMLHttpRequest();
    //     for(var i=0;i<files.length;i++){
    //       formData.append('file',files[i],files[i].name);
    //     }
    //     xhr.onreadystatechange=function(){
    //       if(xhr.readyState==4){
    //         if(xhr.status==200){
    //           resolve(JSON.parse(xhr.response));
    //         }else{
    //           reject(xhr.response);
    //         }
    //     }
    //   }
    //   xhr.open('POST',url,true);
    //   xhr.send(formData);
    //   });
    // }
}