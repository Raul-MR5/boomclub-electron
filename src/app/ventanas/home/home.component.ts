import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  prueba = [1,2,3,4]
  user;
  photo;
  title: string = 'BoomClub';

  canciones: Cancion[];

  constructor(
    private cancionSrv: CancionService,
    private router: Router,
  ) { }

  ngOnInit(): void {    
    document.getElementById("sidebarhome").className += " active"

    this.cancionSrv.getNewsMusic().subscribe(music => {
      this.canciones = music;
    });

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

  getMin(cancion) {
    let audio = new Audio(cancion.cancion)
    return audio.duration;
  }
}
