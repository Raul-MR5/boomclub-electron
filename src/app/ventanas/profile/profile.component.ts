import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Usuario;

  nombre: string;
  foto: string;

  music: Cancion[]

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private storageSrv: StorageService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    // this.user = this.authSrv.usuarioValue.username;
    this.user = this.usuarioSrv.getUsuario();

    this.foto = this.user.foto;
    this.nombre = this.user.username;

    // console.log("this.cancionSrv.getAll()");
    // console.log(await this.cancionSrv.getAll());
    // console.log("this.cancionSrv.getUserMusic()");
    // console.log(await this.cancionSrv.getUserMusic(this.user));

    this.cancionSrv.getUserMusic(this.user).subscribe((music)=>{
      console.log(music);
      this.music = music;
    })
    
    
  }

  goTo(url: string) {
    // let canciones = [];
    // for (let i = 1; i <= 20; i++) {
    //   canciones.push(i)
    // }

    // this.router.navigate(['/profile/' + url],{ queryParams: { canciones: canciones }});
    this.router.navigate(['/profile/' + url]);
  }

  async logout() {
    await this.authSrv.logout().then( ()=>{
      console.log( this.authSrv.getUsuario());
    }
    );
    this.router.navigate(['/login']);
  }

  follow(){
    
  }

  // onUpload(event) {
  //   let music = event.target.files[0];

  //   console.log(music);
    
  //   this.storageSrv.uploadMusic(this.name, music).then(url => {
  //     console.log(url);
  //   });
  // }
}
