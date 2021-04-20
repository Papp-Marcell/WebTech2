import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { VehiclesComponent } from './vehicles/vehicles.component';


const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'Vehicles', component: VehiclesComponent , canActivate: [AuthGuard]},

  {path: '**', redirectTo:'Vehicles'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
