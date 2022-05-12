import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
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
  canciones: Cancion[] = []
  bool: boolean = false;

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private storageSrv: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => this.canciones = params['caller']);
    // this.user = this.authSrv.usuarioValue.username;
    console.log("hola");
    
    document.getElementById("canciones").className += " active"

    this.user = this.usuarioSrv.getUsuario();

    this.foto = this.user.foto;

    this.cancionSrv.getUserMusic(this.user).subscribe((music)=>{
      console.log(music);
      this.canciones = music;

      if (this.canciones.length == 0) {
        this.bool = true;
        console.log(this.bool);
        
      }
    })
    
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
