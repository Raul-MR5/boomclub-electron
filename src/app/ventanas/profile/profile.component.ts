import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  name;
  nombre;
  photo;
  foto;

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private storageSrv: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.user = this.authSrv.usuarioValue.username;

    this.foto = this.usuarioSrv.getUsuario().foto;
    this.nombre = this.usuarioSrv.getUsuario().username;

    this.user = this.authSrv.getUsuario()
    this.user.subscribe(user => {
      this.name = user.displayName;
      this.photo = user.photoURL

      console.log(this.photo);
      

      if (!this.photo) {
        this.photo = "../assets/img/user-photo.png"
      }    
    });
    
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
