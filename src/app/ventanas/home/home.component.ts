import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  prueba = [1, 2, 3, 4]
  user;
  photo;
  title: string = 'BoomClub';

  canciones: Cancion[];
  friendSongs: Cancion[] = [];
  newSongs: Cancion[] = [];

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    document.getElementById("sidebarhome").className += " active"

    this.user = this.usuarioSrv.getUsuario()
    this.authSrv.authenticated().subscribe(bool => {
      if (bool) {
        this.authSrv.getUsuario().subscribe(user => {
          this.usuarioSrv.getOne(user.uid).subscribe(usuario => {

            this.user = usuario;

            this.cancionSrv.getAllByDate().subscribe(music => {
              console.log(music);

              if (this.user.seguidos.length > 0) {
                for (let j = 0; j < this.user.seguidos.length; j++) {
                  for (let i = 0; i < music.length; i++) {

                    // console.log(music[i]);
                    // console.log(music[i].usuario);
                    // console.log(music[i].usuario.id);
                    // console.log('user id');
                    // console.log(this.user.id);


                    if (music[i].usuario.id != this.user.id) {
                      // console.log('1');

                      if (this.user.seguidos) {
                        // console.log('2a');
                        // console.log(this.user);
                        // console.log(this.user.seguidos.length);

                        // if (this.user.seguidos.length > 0) {
                          // for (let j = 0; j < this.user.seguidos.length; j++) {
                          if (this.user.seguidos.includes(music[i].usuario.id)) {
                            // console.log(j);

                            // console.log('3a');
                            if (this.friendSongs.length < 4) {
                              // console.log('4a');
                              console.log('friend');
                              this.friendSongs.push(music[i]);
                            }
                          } else {
                            // console.log('3b');
                            if (this.newSongs.length < 4) {
                              // console.log('4b');
                              console.log('1 new');
                              this.newSongs.push(music[i]);
                            }
                          }
                          // }   
                        // } else {
                        //   if (this.newSongs.length < 4) {
                        //     // console.log('4b');
                        //     console.log('2 new');
                        //     this.newSongs.push(music[i]);
                        //   }
                        // }


                      } else {
                        // console.log('2b');
                        if (this.newSongs.length < 4) {
                          // console.log('3c');
                          console.log('3 new Song');
                          this.newSongs.push(music[i]);
                        }
                      }
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

              console.log(this.friendSongs);
              console.log(this.newSongs);

            })

          })
        });
      }
    })



    // this.cancionSrv.getFriendsMusic().subscribe(music => {
    //   console.log("hola");

    //   this.friendSongs = music;
    //   console.log(music);

    // });

    // this.cancionSrv.getNewsMusic().subscribe(music => {
    //   console.log("hola");

    //   this.newSongs = music;
    //   console.log(music);

    // });

    // this.user = this.authSrv.getUsuario()
    // this.user.subscribe(user => {
    //   this.photo = user.photoURL
    // })
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



  // getMin(cancion) {
  //   let audio = new Audio(cancion.cancion)
  //   return audio.duration;
  // }
}
