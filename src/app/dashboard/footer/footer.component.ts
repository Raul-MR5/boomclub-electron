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
  audio: HTMLAudioElement;

  time;
  playB: boolean = false;

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

      this.cancionSrv.pauseSong();

      this.audio = new Audio(cancion.cancion)
      // console.log(this.audio.currentTime);
      // console.log(this.audio.duration);
      
      this.play();

      // console.log("hola");
      
      console.log(this.song);
      
    });

  }

  play() {
    this.playB = true;

    this.audio.addEventListener("timeupdate", ()=>{
      this.time = (this.audio.currentTime / this.audio.duration)*100;
    })

    this.cancionSrv.playSong(this.audio);
  }

  pause() {
    this.playB = false;

    this.cancionSrv.pauseSong();
  }

  before() {
    if (this.audio.currentTime > 0) {
      this.cancionSrv.resetSong();      
    } else {
      this.cancionSrv.previousSong();      
    }
  }

  after() {
    this.cancionSrv.nextSong();
  }

  parseTime(time){
    if (time){
      // var hour = Math.floor(time / 3600);
      // hour = (hour < 10)? '0' + hour : hour;
      var minute = Math.floor((time / 60) % 60);
      // minute = (minute < 10)? '0' + minute : minute;
      var second = Math.floor(time % 60);
      // second = (second < 10)? '0' + second : second;
      // return hour + ':' + minute + ':' + second;

      // let min = Math.floor(time/60)

      // console.log(hour + ':' + minute + ':' + second);
      // console.log(minute + ':' + second);
      
      if (second < 10) {
        return (minute + ':0' + second);
      } else {
        return (minute + ':' + second);
      }
      
    }else{
      return '0:00'
    }
  }
  
  goTo(url: string) {
    this.router.navigate([url]);
  }
}
