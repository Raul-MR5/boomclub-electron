import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-vista-cancion',
  templateUrl: './vista-cancion.component.html',
  styleUrls: ['./vista-cancion.component.scss']
})
export class VistaCancionComponent implements OnInit {
  user;
  name;
  photo;
  foto;

  prueba = []

  id: number;
  url: string;

  like: boolean = false;
  opt: boolean = true;

  lyrics: string;
  letra: string[] = [];

  constructor(
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private storageSrv: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => { this.id = params['id']; console.log(this.id) });
    this.activatedRoute.params.subscribe((params: Params) => { this.url = params['url']; console.log(this.url) });

    this.foto = this.usuarioSrv.getUsuario().foto;

    this.lyrics = `Se acostó temprano mañana hay que estudiar, eh
Pero llamó la amiga diciendo pa' hangear, eh
Tiene un culito ahí que lo acabó de testear, eh
Pero en bajita, ella no es de frentear
Ella es callaita'
Pero pal' sexo es atrevida, yo sé
Marihuana y bebida
Gozándose la vida, como es
Ella es callaita'
Pero pal' sexo es atrevida, yo sé
Marihuana y bebida
Gozándose la vida, como es
Ella no era así, ella no era así
No sé quién la dañó
Ella no era así, ella no era así
No sé quién la dañó, pero
Ahora enrola
Y lo prende
Es panita
Del que vende, ey
Nena mala de repente
No sé si me miente, pero
Sé que tiene más de veinte
Los shots de tequila ni los siente
Ahora ve la vida diferente
Buena, pero le gusta un delincuente
La baby llega y se siente la presión
Ella ni trata y llama la atención, ey
El perreo es su profesión
Siempre puesta pa' la misión
La baby llega y se siente la presión
Ella ni trata y llama la atención, ey
El perreo es su profesión
Siempre puesta pa' la misión
Ella es callaita
Pero pal' sexo es atrevida, yo sé
Marihuana y bebida
Gozándose la vida, como es
Ella es callaita
Pero pal' sexo es atrevida, yo sé
Marihuana y bebida
Gozándose la vida, como es
Se dejó hace poco y tiene vida nueva
Anda con una amiga que es como su jeva
Que les trajo cinco doce pa' que se las beba
Ella es callaita no es que no se atreva
Si hay sol hay playa
Si hay playa hay alcohol
Si hay alcohol hay sexo
Si es contigo mejor
Si hay sol hay playa
Si hay playa hay alcohol
Si hay alcohol hay sexo
Si es contigo mejor
Quítate la ropa que hace calor
Días de playa, noches de terror
En la gaveta dejo el temor
Pa' las envidiosas paz y amor
Yeah, yeah, yeah, yeah, yeah
Tainy, Tainy, ey
Bad Bunny baby, bebe
Ella es callaita
Pero pal' sexo es atrevida, yo sé
Marihuana y bebida
Gozándose la vida, como es
Ella es callaita
Pero pal' sexo es atrevida, yo sé
Marihuana y bebida
Gozándose la vida, como es
Ella no era así, ella no era así
No sé quién la dañó
Ella no era así, ella no era así
No sé quién la dañó, pero`

    let pepe = `hola`
    // console.log(this.lyrics.length);
    // console.log(pepe.length);
    

    // document.getElementById("p-lyrics").innerHTML = this.lyrics;

    let cont = 0;
    let aux = -1;

    for (let i = 0; i < this.lyrics.length; i++) {
      let c = this.lyrics.charAt(i);

      if (c.charCodeAt(0) == 10) {
        cont++;
        // console.log(cont);
        
      } else {
        if (aux != cont) {
          aux = cont;
          this.letra.push(c);
          // console.log(this.letra);
          
        } else {
          this.letra[aux] += c;
          // console.log(this.letra);
          
        }
        
      }
      
    }

    for (let i = 1; i <= 20; i++) {
      this.prueba.push(i)
    }

  }

  ngOnDestroy(): void {
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

  back() {
    console.log(this.url);
    let ur = this.url.replace(/-/g, '/')
    console.log(ur);

    this.router.navigate(['/' + ur]);
  }

  follow() {

  }

  liked(mg: boolean) {
    this.like = mg;
  }

  menu(op: boolean) {
    if (op) {
      document.getElementById("comentarios").className += " active";
      document.getElementById("lyrics").classList.remove("active");
    } else {
      document.getElementById("lyrics").className += " active";
      document.getElementById("comentarios").classList.remove("active");
    }

    this.opt = op;
  }

  onUpload(event) {
    let music = event.target.files[0];

    console.log(music);

    this.storageSrv.uploadMusic(this.name, music).then(url => {
      console.log(url);
    });
  }
}
