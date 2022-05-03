import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaCancionComponent } from './nueva-cancion.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: NuevaCancionComponent, canActivate: [AuthGuard], pathMatch: "full" }
];

@NgModule({
  declarations: [
    NuevaCancionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class NuevaCancionModule { }
