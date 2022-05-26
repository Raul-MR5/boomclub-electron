import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaListaComponent } from './vista-lista.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: VistaListaComponent, canActivate: [AuthGuard], pathMatch: "full" }
];

@NgModule({
  declarations: [
    // VistaCancionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class VistaListaModule { }
