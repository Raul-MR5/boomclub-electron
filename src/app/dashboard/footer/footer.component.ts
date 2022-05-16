import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  user;
  name;
  photo;
  song: Cancion | null;

  constructor(
    private authSrv: AuthService,
    private cancionSrv: CancionService,
    private router: Router
  ) {
    // this.song = "https://firebasestorage.googleapis.com/v0/b/boomclub-tfg.appspot.com/o/canciones%2FADVANCED%20WARFARE%20VS%20DESTINY%20VS%20TITAN%20FALL.mp3?alt=media&amp;token=b6aa69d3-9831-4706-a874-59b7b67c954c"
  }

  ngOnInit(): void {
    
    this.cancionSrv.cancionActual.subscribe(cancion => {
      this.song = null;
      this.song = cancion;

      let audio: HTMLAudioElement = new Audio(cancion.cancion)
      console.log(audio.currentTime);
      
      audio.play();

      console.log("hola");
      
      console.log(this.song);
      
    });

  }

  async logout() {
    await this.authSrv.logout().then(() => {
      console.log(this.authSrv.getUsuario());
    }
    );
    this.router.navigate(['/login']);
  }
}
