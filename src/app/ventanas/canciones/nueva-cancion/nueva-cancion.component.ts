import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-nueva-cancion',
  templateUrl: './nueva-cancion.component.html',
  styleUrls: ['./nueva-cancion.component.scss']
})
export class NuevaCancionComponent implements OnInit {

  form: FormGroup;
  user;
  name;
  photo;
  foto;

  music;

  prueba = []

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private cancionSrv: CancionService,
    private storageSrv: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.user = this.authSrv.usuarioValue.username;
    console.log("hola");

    // document.getElementById("canciones").className += " active"

    this.form = this.formBuilder.group({
      foto: [''],
      titulo: ['', [Validators.required]],
      cancion: ['', [Validators.required]],
      lyrics: ['']
    });

    this.foto = "https://firebasestorage.googleapis.com/v0/b/boomclub-tfg.appspot.com/o/portadas%2Fdefault-cover-art.png?alt=media&token=39a74894-86e2-4413-81f0-b8584a500b36";
  }

  ngOnDestroy(): void {
    // document.getElementById("canciones").classList.remove("active")
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

  follow() {

  }

  onUploadImg(event) {

    let cover = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(cover);
    reader.onloadend = () => {
      console.log(reader.result);
      this.foto = reader.result;
      console.log(this.foto);
    }


    // this.storageSrv.uploadImg(this.name, this.name, cover).then(url => {
    //   console.log(url);
    // });
  }

  onUploadMusic(event) {

    this.music = event.target.files[0];

    console.log(this.music);

    // let reader = new FileReader();
    // reader.readAsDataURL(music);
    //   reader.onloadend = () => {
    //     console.log(reader.result);
    //     this.foto = reader.result;
    //     console.log(this.foto);
    //   }


    // this.storageSrv.uploadMusic(this.name, this.name, music).then(url => {
    //   console.log(url);
    // });
  }

  async submit() {
    try {
      console.log(this.form.value);

      let user: Usuario = this.usuarioSrv.getUsuario();

      console.log(user);

      this.storageSrv.uploadImg("portadas/cancion/" + user.email, this.form.value.titulo, this.foto).then(async urlImagen => {
        console.log(this.form.value.titulo);

        console.log(urlImagen);

        this.storageSrv.uploadMusic(user.email, this.form.value.titulo, this.music).then(async url => {
          console.log(url);
          console.log(urlImagen);

          let cancion: Cancion = {
            usuario: user,
            titulo: this.form.value.titulo,
            lyrics: this.form.value.lyrics,
            cancion: url,
            foto: urlImagen
          }

          let h = await this.cancionSrv.create(cancion);
          console.log("re: ");
          console.log(h);

          this.router.navigate(['/profile']);
        });

        // let h = await this.usuarioSrv.create(usuario);
        // console.log("re: ");
        // console.log(h);

      });

    } catch (e: any) {
      // alert(e.message)
    }
  }

}
