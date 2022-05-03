import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancionComponent } from './cancion.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: CancionComponent, canActivate: [AuthGuard], pathMatch: "full" }
];

@NgModule({
  declarations: [
    CancionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class CancionModule { }
