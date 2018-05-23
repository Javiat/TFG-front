
import {Component,OnInit,ViewChild,AfterViewInit} from '@angular/core';
import {  OnChanges, SimpleChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { EventService } from '../services/event.service';
import { HttpModule }      from '@angular/http';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Task} from '../models/task';
import {User} from '../models/user';
import {TaskService} from '../services/task.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { CalendarComponent, FullCalendarModule } from 'ng-fullcalendar';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { Options } from 'fullcalendar';
import * as $ from 'jquery';
import 'jquery';

@Component({
  selector: 'timer',
  templateUrl:'../views/game.html',
  providers:[UserService,TaskService,EventService]
})


export class TimerComponent implements OnInit{
  minutes: number;
  seconds: number;
  isPaused: boolean;
  buttonLabel: string;

  constructor() {
    this.resetTimer();
    setInterval(() => this.tick(), 1000);
  }
  ngOnInit(){
    console.log('timer');
  }

  resetTimer(): void {
    this.isPaused = true;
    this.minutes = 24;
    this.seconds = 59;
    this.buttonLabel = 'Start';
  }

  private tick(): void {
    if (!this.isPaused) {
      this.buttonLabel = 'Pause';

      if (--this.seconds < 0) {
        this.seconds = 59;
        if (--this.minutes < 0) {
          this.resetTimer();
        }
      }
    }
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;
    if (this.minutes < 24 || this.seconds < 59) {
      this.buttonLabel = this.isPaused ? 'Resume' : 'Pause';
    }
  }
}

