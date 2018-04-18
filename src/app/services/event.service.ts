import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
@Injectable()
export class EventService {
    public getEvents(): Observable<any> {
        let data: any = [{
            title: 'Reunion BBVA',
            description:'Agenda Presidente',
            localizacion:'Bilbao',
            start:null ,
            end:null,
            duration:'04:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Reunicon JP Morgan',
            description:'Agenda Presidente',
            localizacion:'Londres',
            start: null,
            end:null,
            duration:'01:50',
            type:'liquida',
            user:''
        },
        {
            title: 'Reunicon Chase',
            description:'Agenda Presidente',
            localizacion:'Londres',
            start: null,
            end:null,
            duration:'01:50',
            type:'liquida',
            user:''
        },
        {
            title: 'Reunicon Comité Ejecutivo',
            description:'Agenda Presidente',
            localizacion:'Madrid',
            start: '2018-04-06T13:00:00Z',
            end:null,
            duration:'04:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Entrevista H.Jordi Pujol',
            description:'Agenda Presidente',
            localizacion:'Barcelona',
            start: '2018-04-05T13:00:00Z',
            end:'2018-04-09T15:00:00Z',
            duration:'02:00',
            type:'solida',
            user:''
        },
        {
            title: 'Inauguración Museo de la Ciencia',
            description:'Agenda Presidente',
            localizacion:'Valencia',
            start: '2018-04-02T15:30:00Z',
            end:'2018-04-02T17:30:00Z',
            duration:'02:00',
            type:'solida',
            user:''
        },
        {
            title: 'Reunicon Caixa ',
            description:'Agenda Presidente',
            localizacion:'Barcelona',
            start: null,
            end:null,
            duration:'04:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Reunion Financiera Hispano Lusa ',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Reunion Ministerio de Fomento',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Presentacion Congreso e-Business',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'03:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Entrevista Vicepresidencia del Gobierno',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Inauguración nueva sede Telefonica',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'03:50',
            type:'liquida',
            user:''
        },
        {
            title: 'Entrevista Gas Natural',
            description:'Agenda Presidente',
            localizacion:'Barna',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Congreso Telecomunicaciones Portugal',
            description:'Agenda Presidente',
            localizacion:'Lisboa',
            start: null,
            end:null,
            duration:'04:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Reunion Comercial Patentes Talgo',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'03:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Entrevista Seleccion Consejeros',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Reunion Subsecretario Economia',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida',
            user:''
        },
        {
            title: 'Presentación Libro Ministro',
            description:'Agenda Presidente',
            localizacion:'',
            start: '2018-04-04T17:30:00Z',
            end:'2018-04-04T20:30:00Z',
            duration:'03:00',
            type:'solida',
            user:''
        },
        {
            title: 'Lunch LBS Londres',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'03:00',
            type:'liquida',
            user:''
        },
    ];
        return Observable.of(data);
    }
};