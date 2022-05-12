import { Component, OnInit } from '@angular/core';
import { Usuario } from './shared/models/usuario.model';
import { AuthService } from './shared/services/auth.service';
import { UsuarioService } from './shared/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'boomclub';

  constructor() { }

  ngOnInit(): void {
  }
}
