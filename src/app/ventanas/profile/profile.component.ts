import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  name;
  photo;

  constructor(
    private authSrv: AuthService,
    private storageSrv: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.user = this.authSrv.usuarioValue.username;

    this.user = this.authSrv.getUsuario()
    this.user.subscribe(user => {
      this.name = user.displayName;
      this.photo = user.photoURL

      console.log(this.photo);
      

      if (!this.photo) {
        this.photo = "../assets/img/user-photo.png"
      }    
    });
    
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  async logout() {
    await this.authSrv.logout().then( ()=>{
      console.log( this.authSrv.getUsuario());
    }
    );
    this.router.navigate(['/login']);
  }

  follow(){
    
  }

  onUpload(event) {
    let music = event.target.files;

    console.log(music);
    
    this.storageSrv.upload(this.name, music).then(url => {
      console.log(url);
    });
  }
}
