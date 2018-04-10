import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//Import user
import {UserEditComponent} from './components/user-edit.component'

//Import Tareas
import {TaskListComponent} from './components/task-list.component';
import {TaskAddComponent} from './components/task-add.component';
import {TaskEditComponent} from './components/task-edit.component';
//Import Home
import {HomeComponent} from './components/home.component';

const appRoutes:Routes=[
    {path:'home',component:HomeComponent},
    {path:'mis-datos',component:UserEditComponent},
    {path:'tasks',component:TaskListComponent},
    {path:'add-task/:user',component:TaskAddComponent},
    {path:'update-task/:id',component:TaskEditComponent},
    {path:'update-event/:id',component:TaskListComponent},
    {path:'delete-task/:id',component:TaskEditComponent},
    {path:'**',component:HomeComponent},

];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);