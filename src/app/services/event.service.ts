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
            type:'solida importante trabajo',
            user:''
        },
        {
            title: 'Reunicon JP Morgan',
            description:'Agenda Presidente',
            localizacion:'Londres',
            start: '2018-04-25T13:00',
            end:'2018-04-25T14:50',
            duration:'01:50',
            type:'solida importante trabajo',
            user:''
        },
        {
            title: 'Reunicon Chase',
            description:'Agenda Presidente',
            localizacion:'Londres',
            start: null,
            end:null,
            duration:'01:50',
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Reunicon Comité Ejecutivo',
            description:'Agenda Presidente',
            localizacion:'Madrid',
            start: null,
            end:null,
            duration:'04:00',
            type:'liquida importante trabajo',
            user:''
        },
        {
            title: 'Entrevista H.Jordi Pujol',
            description:'Agenda Presidente',
            localizacion:'Barcelona',
            start: '2018-04-05T13:00',
            end:'2018-04-05T15:00',
            duration:'02:00',
            type:'solida trabajo',
            user:''
        },
        {
            title: 'Inauguración Museo de la Ciencia',
            description:'Agenda Presidente',
            localizacion:'Valencia',
            start: '2018-04-02T15:30',
            end:'2018-04-02T17:30',
            duration:'02:00',
            type:'solida trabajo',
            user:''
        },
        {
            title: 'Reunicon Caixa ',
            description:'Agenda Presidente',
            localizacion:'Barcelona',
            start: null,
            end:null,
            duration:'04:00',
            type:'solida importante trabajo',
            user:''
        },
        {
            title: 'Reunion Financiera Hispano Lusa ',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Reunion Ministerio de Fomento',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'solida urgente trabajo',
            user:''
        },
        {
            title: 'Presentacion Congreso e-Business',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'03:00',
            type:'liquida importante trabajo',
            user:''
        },
        {
            title: 'Entrevista Vicepresidencia del Gobierno',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'solida importante trabajo',
            user:''
        },
        {
            title: 'Inauguración nueva sede Telefonica',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'03:50',
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Entrevista Gas Natural',
            description:'Agenda Presidente',
            localizacion:'Barna',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Congreso Telecomunicaciones Portugal',
            description:'Agenda Presidente',
            localizacion:'Lisboa',
            start: null,
            end:null,
            duration:'04:00',
            type:'liquida urgente trabajo',
            user:''
        },
        {
            title: 'Reunion Comercial Patentes Talgo',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'03:00',
            type:'solida importante trabajo',
            user:''
        },
        {
            title: 'Entrevista Seleccion Consejeros',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Reunion Subsecretario Economia',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'02:00',
            type:'liquida urgente trabajo',
            user:''
        },
        {
            title: 'Presentación Libro Ministro',
            description:'Agenda Presidente',
            localizacion:'',
            start: '2018-04-04T17:30',
            end:'2018-04-04T20:30',
            duration:'03:00',
            type:'solida trabajo',
            user:''
        },
        {
            title: 'Lunch LBS Londres',
            description:'Agenda Presidente',
            localizacion:'Londres',
            start: null,
            end:null,
            duration:'03:00',
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Revision invitaciones Bautizo',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'04:00',
            type:'liquida personal',
            user:''
        },
        {
            title: 'Bautizo',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:'08:00',
            type:'solida importante personal',
            user:''
        },
    ];
        return Observable.of(data);
    }
};