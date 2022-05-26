import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import * as internal from 'stream';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userLogged: Usuario;

  user: Usuario;
  id: string;

  usuarios: Usuario[];
  followers: number = 0;

  nombre: string;
  foto: string;

  music: Cancion[];
  totalMusic: number;

  bool: boolean = false;
  opt: boolean = true;

  followed: boolean = false;

  suscriptions: Subscription[] = [];

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private storageSrv: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const paramsSubscription: Subscription = this.activatedRoute.params.subscribe((params: Params) => { this.id = params['id']; console.log(this.id, "hola"); /* let p = this.prueba(); console.log(p) */ });

    // console.log(this.id);


    this.suscriptions.push(paramsSubscription);


    // this.user = this.authSrv.usuarioValue.username;
    this.userLogged = this.usuarioSrv.getUsuario();

    // console.log("pepe");
    // console.log(this.id);


    this.usuarioSrv.getOne(this.id).subscribe(usuario => {
      this.user = usuario;

      // console.log(this.user);


      this.foto = this.user.foto;
      this.nombre = this.user.username;

      this.followed = this.usuarioSrv.followed(this.user);

      this.getFollowers();

      this.cancionSrv.getUserMusic(this.user).subscribe((music) => {
        this.music = music;

        // console.log(music);

        // console.log("-");


        if (this.music.length == 0) {
          this.bool = true;
          // console.log(this.bool);

        }

        this.totalMusic = this.music.length;
      })
    });
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach(item => item.unsubscribe())
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

  getFollowers() {   

    this.usuarioSrv.followers(this.user.id).subscribe(users => {
      this.followers = 0;
      this.usuarios = users;
      console.log(this.usuarios);

      for (let i = 0; i < this.usuarios.length; i++) {
        console.log(this.user.id);
        
        if (this.usuarios[i].seguidos.includes(this.user.id)) {
          this.followers++;
        }
      }
  
      console.log(this.followers);
    });
  }

  getFollows() {
    if (this.user.seguidos) {
      return this.user.seguidos.length;
    } else {
      return 0;
    }
  }

  seguido() {
    if (this.userLogged.id != this.user.id) {
      if (this.userLogged.seguidos) {
        console.log("entra");

        for (let i = 0; i < this.userLogged.seguidos.length; i++) {
          console.log(this.userLogged.seguidos[i], this.user.id);

          if (this.userLogged.seguidos[i] == this.user.id) {
            this.followed = true;
          } else {
            this.followed = false;
          }

          console.log(this.followed);

        }
      }
    }
  }

  follow() {
    this.usuarioSrv.newFollow(this.userLogged.id, this.user).then(() => {
      this.followed = true;
    })
  }

  unfollow() {
    this.usuarioSrv.removeFollow(this.userLogged.id, this.user).then(() => {
      this.followed = false;
    })
  }

  prueba() {
    return "pepe"
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
