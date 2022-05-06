import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('src/app/ventanas/canciones/cancion.module').then(m => m.CancionModule), canActivate: [AuthGuard]},
      { path: 'artistas',  loadChildren: () => import('src/app/ventanas/biblioteca/artistas/artistas.module').then(m => m.ArtistasModule), canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class ProfileModule { }
