import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-vista-cancion',
  templateUrl: './vista-cancion.component.html',
  styleUrls: ['./vista-cancion.component.scss']
})
export class VistaCancionComponent implements OnInit {
  user;
  name;
  photo;
  foto;

  prueba = []

  id: number;
  url: string;

  like: boolean = false;
  opt: boolean = true;

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private storageSrv: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => { this.id = params['id']; console.log(this.id) });
    this.activatedRoute.params.subscribe((params: Params) => { this.url = params['url']; console.log(this.url) });

    this.foto = this.usuarioSrv.getUsuario().foto;

    for (let i = 1; i <= 20; i++) {
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

  onUpload(event) {
    let music = event.target.files[0];

    console.log(music);

    this.storageSrv.uploadMusic(this.name, music).then(url => {
      console.log(url);
    });
  }
}
