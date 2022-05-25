import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  prueba = [1, 2, 3, 4]
  user;
  photo;
  title: string = 'BoomClub';

  friendSongs: Cancion[] = [];
  newSongs: Cancion[] = [];

  canciones: Cancion[];
  artistas: Usuario[];

  busqueda: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    document.getElementById("sidebarhome").className += " active"


    this.form = this.formBuilder.group({
      search: ['']
    });

    this.user = this.usuarioSrv.getUsuario()
    this.authSrv.authenticated().subscribe(bool => {
      if (bool) {
        this.authSrv.getUsuario().subscribe(user => {
          this.usuarioSrv.getOne(user.uid).subscribe(usuario => {

            this.user = usuario;

            this.cancionSrv.getAllByDate().subscribe(music => {
              if (this.user.seguidos) {
                if (this.user.seguidos.length > 0) {
                  for (let j = 0; j < this.user.seguidos.length; j++) {
                    for (let i = 0; i < music.length; i++) {
                      if (music[i].usuario.id != this.user.id) {

                        if (this.user.seguidos.includes(music[i].usuario.id)) {
                          if (this.friendSongs.length < 4) {
                            this.friendSongs.push(music[i]);
                          }
                        } else {
                          if (this.newSongs.length < 4) {
                            this.newSongs.push(music[i]);
                          }
                        }

                      }
                    }
                  }
                } else {
                  for (let i = 0; i < music.length; i++) {
                    if (this.newSongs.length < 4) {
                      this.newSongs.push(music[i])
                    }
                  }
                }
              } else {
                for (let i = 0; i < music.length; i++) {
                  if (this.newSongs.length < 4) {
                    this.newSongs[i] = music[i]
                  }
                }
              }
            })

          })
        });
      }
    })
  }

  ngOnDestroy(): void {
    document.getElementById("sidebarhome").classList.remove("active")
  }

  titulo() {
    this.title = 'Hola'
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  search() {
    console.log(this.form.value.search);

    if (this.form.value.search.length > 0) {
      this.busqueda = true;

      this.usuarioSrv.getAllMatches(this.form.value.search).subscribe(artistas => {
        this.artistas = artistas;
      });

      this.cancionSrv.getAllMatches(this.form.value.search).subscribe(canciones => {
        this.canciones = canciones;
      });

    } else {
      this.busqueda = false;
    }
  }
}
