import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit {

  usuario: Usuario;
  artistas: Usuario[] = []

  constructor(
    private router: Router,
    private usuarioSrv: UsuarioService,
  ) { }

  ngOnInit(): void {    
    document.getElementById("artistas").className += " active"
    
    this.usuario = this.usuarioSrv.getUsuario();

    for (let i = 0; i < this.usuario.seguidos.length; i++) {
      this.usuarioSrv.getOne(this.usuario.seguidos[i]).subscribe(user => {
        this.artistas.push(user);
      })
      
    }
  }

  ngOnDestroy(): void {
    document.getElementById("artistas").classList.remove("active")
  }

  goTo(url: string) {
    this.router.navigate(['/biblioteca/' + url]);
  }
}
