import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from './add-song.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../../auth/auth.guard';


const routes: Routes = [
  { path: '', component: AddSongComponent, canActivate: [AuthGuard], pathMatch: "full" }
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
export class AddSongModule { }
