import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-lista',
  templateUrl: './nueva-lista.component.html',
  styleUrls: ['./nueva-lista.component.scss']
})
export class NuevaListaComponent implements OnInit {

  prueba = []

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {    
    document.getElementById("listas").className += " active"

    for (let i = 1; i <= 20; i++) {
      this.prueba.push(i)
    }
  }

  ngOnDestroy(): void {
    document.getElementById("listas").classList.remove("active")
  }

  goTo(url: string) {
    this.router.navigate(['/biblioteca/' + url]);
  }
}
