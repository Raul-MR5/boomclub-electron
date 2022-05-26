import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/app/shared/models/lista.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { ListaService } from 'src/app/shared/services/lista.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {

  usuario: Usuario;
  listas: Lista[] = []

  constructor(
    private router: Router,
    private usuarioSrv: UsuarioService,
    private listaSrv: ListaService,
  ) { }

  ngOnInit(): void {    
    document.getElementById("listas").className += " active"
    
    this.usuario = this.usuarioSrv.getUsuario();
    
    this.listaSrv.getUserPlaylist(this.usuario).subscribe(playlist => {
      this.listas = playlist
    });
  }

  ngOnDestroy(): void {
    document.getElementById("listas").classList.remove("active")
  }

  goTo(url: string) {
    this.router.navigate(['/biblioteca/' + url]);
  }
}
