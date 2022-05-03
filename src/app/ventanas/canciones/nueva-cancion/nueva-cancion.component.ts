import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-nueva-cancion',
  templateUrl: './nueva-cancion.component.html',
  styleUrls: ['./nueva-cancion.component.scss']
})
export class NuevaCancionComponent implements OnInit {
  user;
  name;
  photo;
  foto;

  prueba = []

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private storageSrv: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
      this.prueba.push(i)
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
    
    this.storageSrv.uploadMusic(this.name, music).then(url => {
      console.log(url);
    });
  }
}
