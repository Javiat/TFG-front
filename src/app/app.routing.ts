import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//Import user
import {UserEditComponent} from './components/user-edit.component'

//Import Tareas
import {TaskListComponent} from './components/task-list-component';
const appRoutes:Routes=[
    {path:'',component:TaskListComponent},
    {path:'mis-datos',component:UserEditComponent},
    {path:'tasks',component:TaskListComponent},
    {path:'**',component:TaskListComponent},

];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);