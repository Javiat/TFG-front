import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//Import user
import {UserEditComponent} from './components/user-edit.component'

//Import Tareas
import {GameComponent} from './components/game.component';
import {AgendaComponent} from './components/agenda.component';
import {TaskAddComponent} from './components/task-add.component';
import {TaskEditComponent} from './components/task-edit.component';
//Import Home
import {HomeComponent} from './components/home.component';

const appRoutes:Routes=[
    {path:'home',component:HomeComponent},
    {path:'mis-datos',component:UserEditComponent},
    {path:'game',component:GameComponent},
    {path:'agenda',component:AgendaComponent},
    {path:'add-task/:user',component:TaskAddComponent},
    {path:'update-task/:id',component:TaskEditComponent},
    {path:'update-event/:id',component:GameComponent},
    {path:'delete-task/:id',component:TaskEditComponent},
    {path:'**',component:HomeComponent},

];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);