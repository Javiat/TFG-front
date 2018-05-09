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
            duration:4,
            type:'liquida importante trabajo',
            user:''
        },
        {
            title: 'Reunicon JP Morgan',
            description:'Agenda Presidente',
            localizacion:'Londres',
            start: '2018-05-14T13:00',
            end:'2018-05-14T14:50',
            duration:1.50,
            type:'solida importante trabajo',
            user:''
        },
        {
            title: 'Reunicon Chase',
            description:'Agenda Presidente',
            localizacion:'Londres',
            start: null,
            end:null,
            duration:2,
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Reunicon Comité Ejecutivo',
            description:'Agenda Presidente',
            localizacion:'Madrid',
            start: null,
            end:null,
            duration:4.00,
            type:'liquida importante trabajo',
            user:''
        },
        {
            title: 'Entrevista H.Jordi Pujol',
            description:'Agenda Presidente',
            localizacion:'Barcelona',
            start: '2018-05-15T13:00',
            end:'2018-05-15T15:00',
            duration:2.00,
            type:'solida trabajo',
            user:''
        },
        {
            title: 'Inauguración Museo de la Ciencia',
            description:'Agenda Presidente',
            localizacion:'Valencia',
            start: '2018-05-16T15:30',
            end:'2018-05-16T17:30',
            duration:2.00,
            type:'solida trabajo',
            user:'',
            editable:false
        },
        {
            title: 'Reunicon Caixa ',
            description:'Agenda Presidente',
            localizacion:'Barcelona',
            start: null,
            end:null,
            duration:4.00,
            type:'liquida importante trabajo',
            user:''
        },
        {
            title: 'Reunion Financiera Hispano Lusa ',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:2.00,
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Reunion Ministerio de Fomento',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:2.00,
            type:'liquida urgente trabajo',
            user:''
        },
        {
            title: 'Presentacion Congreso e-Business',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:3.00,
            type:'liquida importante trabajo',
            user:''
        },
        {
            title: 'Entrevista Vicepresidencia del Gobierno',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:2.00,
            type:'liquida importante trabajo',
            user:''
        },
        {
            title: 'Inauguración nueva sede Telefonica',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:4.00,
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Entrevista Gas Natural',
            description:'Agenda Presidente',
            localizacion:'Barna',
            start: null,
            end:null,
            duration:2.00,
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Congreso Teleco Portugal',
            description:'Agenda Presidente',
            localizacion:'Lisboa',
            start: null,
            end:null,
            duration:4.00,
            type:'liquida urgente trabajo',
            user:''
        },
        {
            title: 'Reunion Patentes Talgo',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:3.00,
            type:'liquida importante trabajo',
            user:'',
           
        },
        {
            title: 'Entrevista Seleccion Consejeros',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:2.00,
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Reunion Subsecretario Economia',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:2.00,
            type:'liquida urgente trabajo',
            user:''
        },
        {
            title: 'Presentación Libro Ministro',
            description:'Agenda Presidente',
            localizacion:'',
            start: '2018-05-17T17:30',
            end:'2018-05-04T17:30',
            duration:3.00,
            type:'solida trabajo',
            user:''
        },
        {
            title: 'Lunch LBS Londres',
            description:'Agenda Presidente',
            localizacion:'Londres',
            start: null,
            end:null,
            duration:3.00,
            type:'liquida trabajo',
            user:''
        },
        {
            title: 'Revision invitaciones Bautizo',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:4.00,
            type:'liquida personal',
            user:''
        },
        {
            title: 'Bautizo',
            description:'Agenda Presidente',
            localizacion:'',
            start: null,
            end:null,
            duration:8.00,
            type:'solida importante personal',
            user:''
        },
    ];
        return Observable.of(data);
    }
};