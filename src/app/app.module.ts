import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing,appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import {UserEditComponent} from './components/user-edit.component';
import {GameComponent} from './components/game.component';
import {HomeComponent} from './components/home.component';
import {TaskAddComponent} from './components/task-add.component';
import {TaskEditComponent} from './components/task-edit.component';
import{AgendaComponent} from './components/agenda.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    GameComponent,
    HomeComponent,
    TaskAddComponent,
    TaskEditComponent,
    AgendaComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
