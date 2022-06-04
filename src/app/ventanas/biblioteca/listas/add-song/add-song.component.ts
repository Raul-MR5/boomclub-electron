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
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  user: Usuario;
  name;
  photo;
  foto;

  prueba;
  form: FormGroup;

  id: string;
  lista: Lista;

  song: Cancion;
  canciones: Cancion[];

  likes: boolean = false;
  opt: boolean = true;

  comentarios: Comment[] = [];

  lyrics: string;
  letra: string[] = [];

  busqueda: boolean = false;
  cancionesSearch: Cancion[];

  cont = 0;

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

    this.cancionSrv.getAllByDate().subscribe(canciones => {
      this.canciones = canciones
    });

    this.listaSrv.getOne(this.id).subscribe(lista => {
      this.lista = lista;
    });

  }

  ngOnDestroy(): void {
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  back() {
    this.router.navigate(['/lista/' + this.id]);
  }

  search() {
    if (this.form.value.search.length > 0) {
      this.busqueda = true;

      this.cancionSrv.getAllMatches(this.form.value.search).subscribe(canciones => {
        this.cancionesSearch = canciones;
      });

    } else {
      this.busqueda = false;
    }
  }

  add(songId: string) {
    this.cancionSrv.getOne(songId).subscribe(song => {
      let cancion: Cancion

      if (this.lista.canciones) {
        cancion = {
          ...song,
          position: (this.lista.canciones.length + 1)
        }
      } else {
        cancion = {
          ...song,
          position: 1
        }
      }

      if (this.cont == 0) {
        this.listaSrv.addSong(this.id, cancion).then(() => {
          this.router.navigate(['/lista/' + this.id]);
        });
        this.cont++;
      }
    });
  }
}
