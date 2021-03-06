import { Component,OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import {GLOBAL} from './services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TaskService} from './services/task.service';
import { Task } from './models/task';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService,TaskService]
})
export class AppComponent implements OnInit{
  public title = 'Calendar';
  public user:User;
  public user_register:User;
  public identity;
  public alertRegister;
  public errorMessage;
  public url;
  events=null;


  constructor(
    private _userService:UserService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _taskService:TaskService
  ){
    this.user=new User('','','','','',0,'');
    this.user_register=new User('','','','','',0,'');
    this.url=GLOBAL.url;
  }

  ngOnInit(){
    this.identity=this._userService.getIdentity();
    $.getScript('/assets/js/script.js');
  }

  public onSubmit(){
    //Conseguir los datos del usuario
    this._userService.signup(this.user).subscribe(
      response=>{
        console.log(response);
         let identity=response.user;
         this.identity=identity;
         if(!this.identity._id){
          alert("El usuario no esta identificado");
         }else{
          //Crear elemento en el localstorage 
          localStorage.setItem('identity',JSON.stringify(identity));
          this.user=new User('','','','','',0,'');
          this.user_register=new User('','','','','',0,'');
           
         }
      },
      error=>{
        var errorMessage=<any>error;
        if(errorMessage!=null){
          var body=JSON.parse(error._body);
         this.errorMessage=body.message;
          console.log(errorMessage);
        }
      }
    );
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.clear();
    this.identity=null;
    this._router.navigate(['/']);
  }
  onSubmitRegister(){
    this._userService.register(this.user_register).subscribe(
      response=>{
        let user=response.user;
        this.user_register=user;
        if(!user._id){
          this.alertRegister='Error al registrarse';
        }else{
          this.alertRegister='El registro se ha realizado correctamente,identificate con'+ this.user_register.email;
          this.user_register=new User('','','','','',0,'');
        }
      },
      error=>{
        var alertRegister=<any>error;
        if(alertRegister!=null){
          var body=JSON.parse(error._body);
          this.alertRegister=body.message;
          console.log(alertRegister);
        }
      }
    );
    
  }
}
