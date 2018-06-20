import {Component, OnInit} from '@angular/core';

import {UserService} from '../services/user.service';
import {PartidaService} from '../services/partidas.services';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService,PartidaService]
})
export class UserEditComponent implements OnInit {
    public title:string;
    public user:User;
    public identity;
    public alertUpdate;
    public filesToUpload:Array<File>;
    public url:string;
    public partidas=[];
    constructor(
        private _userService:UserService,
        private _partidaService:PartidaService
    ){
        //LocalStorage
        this.identity=this._userService.getIdentity();
        this.title='Actualizar mis datos';
        this.user=this.identity;
        this.url=GLOBAL.url;
    }

    ngOnInit(){
        console.log('user-edit.component.ts cargado');
        this.getPartidas();
        $.getScript('../assets/js/script.js');
    }
    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
            response=>{
              if(!response.user){
                this.alertUpdate='El usuario no se ha actualizado';
              }else{
                this.user=response.user;

                localStorage.setItem('identity',JSON.stringify(this.user));
                document.getElementById("identity_name").innerHTML=this.user.name;
                if(!this.filesToUpload){
                    //Redireccion
                }else{
                    this.makeFileRequest(this.url+'image-user/'+this.user._id,[],this.filesToUpload)
                    .then(
                        (result:any)=>{
                            this.user.image=result.image;
                            localStorage.setItem('identity',JSON.stringify(this.user));
                            let image_path=this.url+'get-image-user/'+this.user.image;
                            document.getElementById('image-logged').setAttribute('src',image_path);
                        }
                    );
                }
                this.alertUpdate='Datos actualizados correctamente';

              } 
            },
            error=>{
                var alertUpdate=<any>error;
                if(alertUpdate!=null){
                  var body=JSON.parse(error._body);
                  this.alertUpdate=body.message;
                }
            }
        );

    }
    fileChangeEvent(fileInput:any){
        this.filesToUpload=<Array<File>>fileInput.target.files;
    }
    makeFileRequest(url:string,params:Array<string>,files:Array<File>){
        return new Promise(function(resolve,reject){
            var formData:any=new FormData();
            var xhr=new XMLHttpRequest();
            for(var i=0;i<files.length;i++){
                formData.append('image',files[i],files[i].name);
            }
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
                
            }
            xhr.open('POST',url,true);
            xhr.send(formData);
        });
    }

    getPartidas(){
        this._partidaService.getPartidas(this.user._id).subscribe(
            response=>{
                if(!response.partidas){
                    console.log('error');
                }else{
                    this.partidas=response.partidas;
                    console.log(this.partidas);
                }
            },
            error=>{
                console.log('error');
            }
            
        )
    }
}