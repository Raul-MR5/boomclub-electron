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
      texto: ['']
    });

    // this.foto = this.usuarioSrv.getUsuario().foto;
    this.user = this.usuarioSrv.getUsuario();

    this.listaSrv.getOne(this.id).subscribe(lista => {
      this.lista = lista;

      console.log(this.lista);

      this.foto = this.lista.foto;
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
    // console.log(this.url);
    // let ur = this.url.replace(/-/g, '/')
    // console.log(ur);

    // this.router.navigate(['/' + ur]);
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

  // onUpload(event) {
  //   let music = event.target.files[0];

  //   console.log(music);

  //   this.storageSrv.uploadMusic(this.name, music).then(url => {
  //     console.log(url);
  //   });
  // }
}
