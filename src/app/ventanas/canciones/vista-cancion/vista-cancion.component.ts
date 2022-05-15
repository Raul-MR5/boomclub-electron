import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-vista-cancion',
  templateUrl: './vista-cancion.component.html',
  styleUrls: ['./vista-cancion.component.scss']
})
export class VistaCancionComponent implements OnInit {
  user: Usuario;
  name;
  photo;
  foto;

  prueba = []

  id: string;
  url: string;
  song: Cancion;

  like: boolean = false;
  opt: boolean = true;

  lyrics: string;
  letra: string[] = [];

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private storageSrv: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => { this.id = params['id']; console.log(this.id) });
    this.activatedRoute.params.subscribe((params: Params) => { this.url = params['url']; console.log(this.url) });

    // this.foto = this.usuarioSrv.getUsuario().foto;
    this.user = this.usuarioSrv.getUsuario();

    this.cancionSrv.getOne(this.id).subscribe(cancion => {
      this.song = cancion;

      console.log(this.song);

      this.foto = this.song.foto;
      this.lyrics = this.song.lyrics;

      console.log(this.lyrics);

      let cont = 0;
      let aux = -1;

      for (let i = 0; i < this.lyrics.length; i++) {
        let c = this.lyrics.charAt(i);

        if (c.charCodeAt(0) == 10) {
          cont++;
          // console.log(cont);

        } else {
          if (aux != cont) {
            aux = cont;
            this.letra.push(c);
            // console.log(this.letra);

          } else {
            this.letra[aux] += c;
            // console.log(this.letra);

          }

        }

      }
    });

    for (let i = 1; i <= 5; i++) {
      this.prueba.push(i)
    }

  }

  ngOnDestroy(): void {
  }


  goTo(url: string) {
    this.router.navigate([url]);
  }

  async logout() {
    await this.authSrv.logout().then(() => {
      console.log(this.authSrv.getUsuario());
    }
    );
    this.router.navigate(['/login']);
  }

  back() {
    console.log(this.url);
    let ur = this.url.replace(/-/g, '/')
    console.log(ur);

    this.router.navigate(['/' + ur]);
  }

  follow() {

  }

  liked(mg: boolean) {
    this.like = mg;
  }

  menu(op: boolean) {
    if (op) {
      document.getElementById("comentarios").className += " active";
      document.getElementById("lyrics").classList.remove("active");
    } else {
      document.getElementById("lyrics").className += " active";
      document.getElementById("comentarios").classList.remove("active");
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
