import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario.model';
// import { AccountService } from 'src/app/shared/services/account.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  user: Usuario;
  name: string;

  imagenes: any[] = [];
  avatar: any;

  constructor(
    private formBuilder: FormBuilder,
    // private accountSrv: AccountService,
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private storageSrv: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/']);
    }

    // this.user = this.usuarioSrv.getUsuario()
    // this.name = this.user.nombre;

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellidos: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', Validators.required]
    });
  }

  // submit(): void {
  //   var nUser: any = {
  //     id: this.form.value.id,
  //     username: this.form.value.username,
  //     password: this.form.value.password,
  //     email: this.form.value.email,
  //     nombre: this.form.value.nombre,
  //     apellidos: this.form.value.apellidos,
  //     fecAlta: new Date,
  //     fecBaja: null,
  //     activo: true,
  //     rol: {
  //       id: 2
  //     }
  //   }

  //   this.usuarioSrv.create(nUser)
  //     .subscribe(
  //       () => {
  //         this.router.navigate(['/login']);
  //       }
  //     );

  //   // this.accountSrv.login(this.form.value.user, this.form.value.password)
  //   //   .subscribe(
  //   //     () => {
  //   //       this.router.navigate(['/login']);
  //   //     }
  //   //   );
  // }

  onUpload(event) {
    let archivos = event.target.files;
    let nombre = "jonathan";

    for (let i = 0; i < archivos.length; i++) {

      let reader = new FileReader();
      reader.readAsDataURL(archivos[0]);
      reader.onloadend = () => {
        console.log(reader.result);
        this.avatar = reader.result;
        // this.imagenes.push(reader.result);
        // this.storageSrv.uploadImg(this.name, reader.result).then(urlImagen => {
        //   // let usuario = {
        //   //   name: "jonathan",
        //   //   nickName: "yonykikok",
        //   //   password: "401325",
        //   //   imgProfile: urlImagen
        //   // }
        //   console.log(urlImagen);
        // });
      }
    }
  }

  async submit() {
    //this.firebase.collection('Usuarios').get();

    try {
      console.log(this.form.value.email, this.form.value.password);

      await this.authSrv.register(this.form.value.email, this.form.value.password).then(async user => {
        if (user) {
          user.user.updateProfile({
            displayName: this.form.value.username
          })

          this.storageSrv.uploadImg(user.user.displayName, this.avatar).then(async urlImagen => {

            if (!urlImagen) {
              urlImagen = "https://firebasestorage.googleapis.com/v0/b/boomclub-tfg.appspot.com/o/user-photo.png?alt=media&token=c9588aa9-1450-4932-86cd-d480853474d1"
            }

            let usuario: Usuario = {
              id: user.user.uid,
              username: this.form.value.username,
              nombre: this.form.value.nombre,
              apellidos: this.form.value.apellidos,
              email: this.form.value.email,
              foto: urlImagen
            }

            console.log(urlImagen);

            let h = await this.usuarioSrv.create(usuario);
            console.log("re: ");
            console.log(h);

            this.authSrv.emailVerified();
            this.authSrv.logout();
  
            this.router.navigate(['/login']);
          });
        }
      })
    } catch (e: any) {
      // alert(e.message)
    }
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
