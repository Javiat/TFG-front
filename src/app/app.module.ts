import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing,appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import {UserEditComponent} from './components/user-edit.component';
import {TaskListComponent} from './components/task-list.component';
import {HomeComponent} from './components/home.component';
import {TaskAddComponent} from './components/task-add.component';
import {TaskEditComponent} from './components/task-edit.component';
import {RegisterComponent} from './components/register.component';
import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    TaskListComponent,
    HomeComponent,
    TaskAddComponent,
    TaskEditComponent,
   RegisterComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    FullCalendarModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
