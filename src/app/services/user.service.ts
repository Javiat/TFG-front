import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';
import { map } from 'rxjs/operator/map';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    constructor(private _http:Http){
        this.url=GLOBAL.url;
    }

    signup(user_to_login,gethash=null){
        let json=JSON.stringify(user_to_login);
        let params=json;

        let headers=new Headers({'Content-Type':'application/json'});
        return this._http.post(this.url+'login-user',params,{headers:headers})
                                .map(res=>res.json());
    }
    
    


    register(user_to_register){
        let json=JSON.stringify(user_to_register);
        let params=json;
        let headers=new Headers({'Content-Type':'application/json'});
        return this._http.post(this.url+'save-user',params,{headers:headers})
                                .map(res=>res.json());
    }

    getIdentity(){
        let identity=JSON.parse(localStorage.getItem('identity'));
        if(identity!="undefined"){
            this.identity=identity;
        }else{
            this.identity=null;
        }
        return this.identity;
    }

    updateUser(user_to_update){
        let params=JSON.stringify(user_to_update);
        let headers=new Headers({
            'Content-Type':'application/json'
        });
        return this._http.put(this.url+'update-user/'+user_to_update._id,params,{headers:headers})
                            .map(res=>res.json());
    }

    updatePartidas(user_to_update){
        let params=JSON.stringify(user_to_update);
        let headers=new Headers({
            'Content-Type':'application/json'
        });
        return this._http.put(this.url+'update-partidas/'+user_to_update._id,params,{headers:headers})
                            .map(res=>res.json());
    }
}