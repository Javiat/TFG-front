import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { EventService } from '../services/event.service';
import {TaskService} from '../services/task.service';
import {UserService} from '../services/user.service';
import { Task } from '../models/task';
import { User } from '../models/user';
import { duration } from 'moment';
declare var jQuery:any;
declare var $:any;
declare var fn:any;

@Component({
    selector:'home',
    templateUrl:'../views/home.html'
})

export class HomeComponent implements OnInit{
    public title:string;
    
    public identity;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private eventService:EventService,
        private _taskService:TaskService,
        private _userService:UserService
    ){
        this.title='APLICACIÓN GESTIÓN DEL TIEMPO';
    }

    ngOnInit(){
        console.log('home.component.ts cargado');
        $.getScript('../assets/js/script.js'); 
        //Conseguir el listado de tareas
    }

    juego(){
        var tasks=[];
        this.identity=this._userService.getIdentity();
        this._taskService.getTaskJuego(this.identity._id).subscribe(
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
        );
        
        // var horas=12;
        // var f = new Date();
        // var day=14;
        // var month=(f.getMonth() +1);
        // var hora_inicio;
        //     for(var i=0;i<this.tasks.length;i++){    
        //              this.tasks[i].user=this.identity._id;
        //              if(this.tasks[i].start==null && this.tasks[i].end==null){ 
        //                 if(this.tasks[i].duration<=horas){
        //                     if(i==0){
        //                         hora_inicio=9;
        //                         var fecha=f.getFullYear() + "-0" + month + "-" + day+"T0"+hora_inicio;
        //                         this.tasks[i].start=fecha;
        //                         hora_inicio+=this.tasks[i].duration;
        //                         var fecha=f.getFullYear() + "-0" + month + "-"  +day+"T"+hora_inicio;
        //                         this.tasks[i].end=fecha;
        //                         horas=horas-this.tasks[i].duration;
        //                     }else{
        //                         var fecha=f.getFullYear() + "-0" + month + "-" + day+"T"+hora_inicio;
        //                         this.tasks[i].start=fecha;
        //                         hora_inicio+=this.tasks[i].duration;
        //                         var fecha=f.getFullYear() + "-0" + month + "-" + day+"T"+hora_inicio;
        //                         this.tasks[i].end=fecha;
        //                         horas=horas-this.tasks[i].duration;
        //                     }
                            
        //                 }else{
        //                    horas=12;
        //                    hora_inicio=9;
        //                    day=(day+1);
        //                    var month=(f.getMonth() +1); 
        //                    var fecha=f.getFullYear() + "-0" + month + "-" +day+"T0"+hora_inicio;
        //                     this.tasks[i].start=fecha;
        //                     hora_inicio+=this.tasks[i].duration;
        //                     var fecha=f.getFullYear() + "-0" + month + "-" +day+"T"+hora_inicio;
        //                     this.tasks[i].end=fecha;
        //                     horas=horas-this.tasks[i].duration;
        //                 }
                       
        //              }
        //              this._taskService.addTask(this.tasks[i]).subscribe(
        //                response=>{
        //                    if(!response.task){
        //                        console.log(response);
        //                    }else{ 
        //                        console.log(response.task);
        //                    }
        //                },
        //                error=>{
        //                    console.log('Error');
        //               }
        
        //            );
        //            } 
    }
}