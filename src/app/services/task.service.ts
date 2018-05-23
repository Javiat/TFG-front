import {Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Task } from '../models/task';

@Injectable()
export class TaskService{
    public url:string;
    public identity;
    constructor(private _http:Http){
        this.url=GLOBAL.url;
    }

    getJson(){
        return this._http.get('').map(res=>res.json());
    }
    
    getTask(id:string){
        let headers=new Headers({
            'Content-Type':'application/json'
       });
       let options=new RequestOptions({headers:headers}); 
       return this._http.get(this.url+'get-task/'+id,options)
                            .map(res=>res.json());
    }
    getTaskJuego(id:string){
        let headers=new Headers({
            'Content-Type':'application/json'
       });
       let options=new RequestOptions({headers:headers}); 
       return this._http.get(this.url+'get-task-juego/'+id,options)
                            .map(res=>res.json());
    }
    
   getTasks(userId){
       let headers=new Headers({
            'Content-Type':'application/json'
       });
       let options=new RequestOptions({headers:headers});
       return this._http.get(this.url+'get-tasks/'+userId,options)
                            .map(res=>res.json());
   }
   getNivel3(userId){
    let headers=new Headers({
         'Content-Type':'application/json'
    });
    let options=new RequestOptions({headers:headers});
    return this._http.get(this.url+'nivel3'+userId,options)
                         .map(res=>res.json());
}
   getTasksGame(userId){
    let headers=new Headers({
         'Content-Type':'application/json'
    });
    let options=new RequestOptions({headers:headers});
    return this._http.get(this.url+'get-tasks-game/'+userId,options)
                         .map(res=>res.json());
}

    caso_base(userId){
    let headers=new Headers({
         'Content-Type':'application/json'
    });
    let options=new RequestOptions({headers:headers});
    return this._http.get(this.url+'caso-base/'+userId,options)
                         .map(res=>res.json());
    }

   addTask(task:Task){
        let params=JSON.stringify(task);
        let headers=new Headers({
            'Content-Type':'application/json'
        });
        return this._http.post(this.url+'save-task',params,{headers:headers})
                            .map(res=>res.json());
   }
    
   updateTask(id:string,task:Task){
    let params=JSON.stringify(task);
    let headers=new Headers({
        'Content-Type':'application/json'
    });
    return this._http.put(this.url+'update-task/'+id,params,{headers:headers})
                        .map(res=>res.json());
    }

    updateEvent(id:string,model:any){
        let params=JSON.stringify(model);
        let headers=new Headers({
            'Content-Type':'application/json'
        });
        return this._http.put(this.url+'update-event/'+id,params,{headers:headers})
                            .map(res=>res.json());
        }


    deleteTask(id:string){
        let headers=new Headers({
            'Content-Type':'application/json'
        });
        let options=new RequestOptions({headers:headers});
        return this._http.delete(this.url+'/delete-task/'+id,options)
                                .map(res=>res.json());
    }
    getFile(file:string){
        let headers=new Headers({
            'Content-Type':'application/json'
        });
        let options=new RequestOptions({headers:headers});
        return this._http.get(this.url+'/get-file/'+file,options)
                                .map(res=>res.json());
    }
}