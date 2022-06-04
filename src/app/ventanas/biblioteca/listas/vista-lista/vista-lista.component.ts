import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { Comment } from 'src/app/shared/models/comment.model';
import { Lista } from 'src/app/shared/models/lista.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ListaService } from 'src/app/shared/services/lista.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-vista-lista',
  templateUrl: './vista-lista.component.html',
  styleUrls: ['./vista-lista.component.scss']
})
export class VistaListaComponent implements OnInit {
  user: Usuario;
  name;
  photo;
  foto;

  prueba;
  form: FormGroup;

  id: string;
  lista: Lista;

  song: Cancion;

  likes: boolean = false;
  opt: boolean = true;

  comentarios: Comment[] = [];

  lyrics: string;
  letra: string[] = [];

  busqueda: boolean = false;
  canciones: Cancion[];

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private listaSrv: ListaService,
    private commentSrv: CommentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => { this.id = params['id']; });

    this.form = this.formBuilder.group({
      search: ['']
    });

    // this.foto = this.usuarioSrv.getUsuario().foto;
    this.user = this.usuarioSrv.getUsuario();

    this.listaSrv.getOne(this.id).subscribe(lista => {
      this.lista = lista;

      this.foto = this.lista.foto;
      this.canciones = this.lista.canciones;
    });
  }

  ngOnDestroy(): void {
  }


  goTo(url: string) {
    this.router.navigate([url]);
  }

  back() {
    this.router.navigate(['/biblioteca/']);
  }

  play() {
    this.cancionSrv.setPlaylist(this.canciones);
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
}
