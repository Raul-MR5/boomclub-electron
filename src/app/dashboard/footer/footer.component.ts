import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  user;
  name;
  photo;
  song;

  constructor(
    private authSrv: AuthService,
    private router: Router
  ) {
    // this.song = "https://firebasestorage.googleapis.com/v0/b/boomclub-tfg.appspot.com/o/canciones%2FADVANCED%20WARFARE%20VS%20DESTINY%20VS%20TITAN%20FALL.mp3?alt=media&amp;token=b6aa69d3-9831-4706-a874-59b7b67c954c"
  }

  ngOnInit(): void {
    // this.user = this.authSrv.usuarioValue.username;

    this.user = this.authSrv.getUsuario()
    this.user.subscribe(user => {
      this.name = user.displayName;
      this.photo = user.photoURL

      console.log(this.photo);


      if (!this.photo) {
        this.photo = "https://firebasestorage.googleapis.com/v0/b/boomclub-tfg.appspot.com/o/user-photo.png?alt=media&token=c9588aa9-1450-4932-86cd-d480853474d1"
      }
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
