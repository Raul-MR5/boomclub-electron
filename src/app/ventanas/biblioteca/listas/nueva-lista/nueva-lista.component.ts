import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cancion } from 'src/app/shared/models/cancion.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CancionService } from 'src/app/shared/services/cancion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-nueva-lista',
  templateUrl: './nueva-lista.component.html',
  styleUrls: ['./nueva-lista.component.scss']
})
export class NuevaListaComponent implements OnInit {

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

        console.log(this.foto);
        

        console.log(urlImagen);

        this.storageSrv.uploadMusic(user.email, this.form.value.titulo, this.music).then(async url => {
          console.log(url);
          console.log(urlImagen);

          let myuuid = uuidv4();

          console.log('Your UUID is: ' + myuuid);
          let cancion: Cancion;
          if (urlImagen) {
            cancion = {
              id: myuuid,
              usuario: user,
              titulo: this.form.value.titulo,
              lyrics: this.form.value.lyrics,
              cancion: url,
              foto: urlImagen,
              fecha: new Date()
            }
          } else{
            cancion = {
              id: myuuid,
              usuario: user,
              titulo: this.form.value.titulo,
              lyrics: this.form.value.lyrics,
              cancion: url,
              foto: this.foto,
              fecha: new Date()
            }
          }
          

          await this.cancionSrv.create(cancion);

          this.router.navigate(['/profile/' + user.id]);
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
