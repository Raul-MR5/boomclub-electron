import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  userLogged: Usuario;

  user: Usuario;
  id: string;

  nombre: string;
  foto: string;

  music: Cancion[]
  bool: boolean = false;
  opt: boolean = true;

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private storageSrv: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params: Params) => { this.id = params['id']; console.log(this.id) });

    // this.user = this.authSrv.usuarioValue.username;
    this.userLogged = this.usuarioSrv.getUsuario();

    this.usuarioSrv.getOne(this.id).subscribe(usuario => {
      this.user = usuario;

      this.foto = this.user.foto;
      this.nombre = this.user.username;

      this.cancionSrv.getUserMusic(this.user).subscribe((music) => {
        this.music = music;

        if (this.music.length == 0) {
          this.bool = true;
          // console.log(this.bool);
  
        }
      })
    });
  }

  goTo(url: string) {
    console.log(url);
    
    this.router.navigate([url]);
  }

  async logout() {
    await this.authSrv.logout().then(() => {
      console.log(this.authSrv.getUsuario());
    }
    );
    this.router.navigate(['/login']);
  }

  follow() {

  }

  logged(): boolean {
    
    if (this.user.id == this.userLogged.id) {
      return false;
    } else {
      return true;
    }
  }

  menu(op: boolean) {
    if (op) {
      document.getElementById("canciones").className += " active";
      document.getElementById("albums").classList.remove("active");
    } else {
      document.getElementById("albums").className += " active";
      document.getElementById("canciones").classList.remove("active");
    }

    this.opt = op;
  }

  // onUpload(event) {
  //   let music = event.target.files[0];

  //   console.log(music);

  //   this.storageSrv.uploadMusic(this.name, music).then(url => {
  //     console.log(url);
  //   });
  // }
}
