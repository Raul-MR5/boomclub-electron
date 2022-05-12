import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.scss']
})
export class CancionComponent implements OnInit {
  user;
  name;
  photo;
  foto;

  // @Input() 
  canciones = []

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private storageSrv: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => this.canciones = params['caller']);
    // this.user = this.authSrv.usuarioValue.username;
    console.log("hola");
    
    document.getElementById("canciones").className += " active"

    this.foto = this.usuarioSrv.getUsuario().foto;

    this.user = this.authSrv.getUsuario()
    this.user.subscribe(user => {
      this.name = user.displayName;
      this.photo = user.photoURL

      console.log(this.photo);
      

      if (!this.photo) {
        this.photo = "../assets/img/user-photo.png"
      }    
    });

    for (let i = 1; i <= 20; i++) {
      this.canciones.push(i)
    }
    
  }

  ngOnDestroy(): void {
    document.getElementById("canciones").classList.remove("active")
  }


  goTo(url: string) {
    this.router.navigate([url]);
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

  onUpload(event) {
    let music = event.target.files[0];

    console.log(music);
    
    this.storageSrv.uploadMusic(this.name, this.name, music).then(url => {
      console.log(url);
    });
  }
}
