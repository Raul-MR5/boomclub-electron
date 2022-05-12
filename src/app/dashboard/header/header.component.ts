import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user;
  name;
  photo;

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.user = this.authSrv.usuarioValue.username;
    // this.authSrv.usuario.subscribe((usuario)=>{
    //   this.photo = usuario.foto
    //   console.log("usuario");
    //   console.log("-------------");
    //   console.log(usuario);
    // })

    this.authSrv.authenticated().subscribe(bool => {
      if (bool) {
        this.authSrv.getUsuario().subscribe(user => {
          this.usuarioSrv.getOne(user.uid).subscribe(usuario => {
            this.usuarioSrv.setUsuario(usuario);

            this.photo = usuario.foto
            this.name = usuario.username;

            if (!this.photo) {
              this.photo = "https://firebasestorage.googleapis.com/v0/b/boomclub-tfg.appspot.com/o/user-photo.png?alt=media&token=c9588aa9-1450-4932-86cd-d480853474d1"
            }

            console.log("authenticated");
            console.log("-------------");
            
            console.log(usuario);
          })
        });
      }
    })

    // this.user = this.authSrv.getUsuario()
    // this.user.subscribe(user => {
    //   this.name = user.displayName;   
    //   console.log("header ---- ");
    //   console.log(" ---- ");
         
    //   console.log(this.usuarioSrv.getUsuario());
    //   console.log(" ---- ");
      
    //   // this.photo = this.usuarioSrv.getUsuario().foto

    //   if (!this.photo) {
    //     this.photo = "https://firebasestorage.googleapis.com/v0/b/boomclub-tfg.appspot.com/o/user-photo.png?alt=media&token=c9588aa9-1450-4932-86cd-d480853474d1"
    //   } else {
    //     // this.usuarioSrv.getUsuario().foto = user.photo
    //     // this.photo = this.usuarioSrv.getUsuario().foto
    //   }
      
    //   console.log(this.photo);
    // });
    
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
}
