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
    this.activatedRoute.params.subscribe((params: Params) => { this.id = params['id']; console.log(this.id) });

    this.form = this.formBuilder.group({
      search: ['']
    });

    // this.foto = this.usuarioSrv.getUsuario().foto;
    this.user = this.usuarioSrv.getUsuario();

    this.cancionSrv.getAllByDate().subscribe(canciones => {
      this.canciones = canciones
      console.log(this.canciones);
      
    });

    // for (let i = 1; i <= 5; i++) {
    //   this.prueba.push(i)
    // }

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
    this.router.navigate(['/lista/' + this.id]);
  }

  play() {
    this.cancionSrv.setSong(this.song);
  }

  sendComment() {
    let myuuid = uuidv4();
    console.log("heyo");
    
    let comentario: Comment = {
      id: myuuid,
      usuario: this.user,
      cancion: this.song,
      texto: this.form.value.texto
    }

    console.log(comentario);
    
    this.commentSrv.create(comentario);
    this.form.reset();
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

  liked() {
    if (this.song.id != this.user.id) {
      if (this.song.likes) {
        console.log("entra");

        for (let i = 0; i < this.song.likes.length; i++) {
          console.log(this.song.likes[i], this.user.id);

          if (this.song.likes[i] == this.user.id) {
            this.likes = true;
          } else {
            this.likes = false;
          }

          console.log(this.likes);

        }
      }
    }
  }

  like() {
    this.cancionSrv.newLike(this.song.id, this.song).then(() => {
      this.likes = true;
    })
  }

  dislike() {
    this.cancionSrv.removeLike(this.song.id, this.song).then(() => {
      this.likes = false;
    })
  }

  search() {
    console.log(this.form.value.search);

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
      this.listaSrv.addSong(this.id, song).then(() => {
        this.router.navigate(['/lista/' + this.id]);
      })
    });
    
  }
}
