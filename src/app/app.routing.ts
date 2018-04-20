import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//Import user
import {UserEditComponent} from './components/user-edit.component'

//Import Tareas
import {GameComponent} from './components/game.component';
import {AgendaComponent} from './components/agenda.component';
import {TaskAddComponent} from './components/task-add.component';
import {TaskGameEditComponent} from './components/taskgame-edit.component';
import {TaskAgendaEditComponent} from './components/taskagenda-edit-component';
//Import Home
import {HomeComponent} from './components/home.component';

const appRoutes:Routes=[
    {path:'home',component:HomeComponent},
    {path:'mis-datos',component:UserEditComponent},
    {path:'game',component:GameComponent},
    {path:'agenda',component:AgendaComponent},
    {path:'add-task/:user',component:TaskAddComponent},
    {path:'update-task/:id',component:TaskGameEditComponent},
    {path:'update-task-agenda/:id',component:TaskAgendaEditComponent},
    {path:'update-event/:id',component:GameComponent},
    {path:'delete-task/:id',component:TaskGameEditComponent},
    {path:'**',component:HomeComponent},

];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);