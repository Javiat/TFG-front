import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Task} from '../models/task';

@Component({
    selector:'task-list',
    templateUrl:'../views/task-list.html',
    providers:[UserService]
})

export class TaskListComponent implements OnInit{
    public title:string;
    public tasks:Task[];
    public identity;
    public url:String;

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService
    ){
        this.title='Tareas';
        this.identity=this._userService.getIdentity();
        this.url=GLOBAL.url;
    }

    ngOnInit(){
        console.log('task-list.component.ts cargado');

        //Conseguir el listado de tareas

        
    }
}