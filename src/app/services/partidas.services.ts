import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';
import { map } from 'rxjs/operator/map';
import { Partida } from '../models/partida';
@Injectable()
export class PartidaService{
    public url:string;
    public identity;
    constructor(private _http:Http){
        this.url=GLOBAL.url;
    }
    register(partida){
        let params=JSON.stringify(partida);
        let headers=new Headers({
            'Content-Type':'application/json'
        });
        return this._http.post(this.url+'save-partida',params,{headers:headers})
                            .map(res=>res.json());
   }

   updatePartida(id:string,partida:Partida){
    let params=JSON.stringify(partida);
    let headers=new Headers({
        'Content-Type':'application/json'
    });
    return this._http.put(this.url+'update-partida/'+id,params,{headers:headers})
                        .map(res=>res.json());
    }
}