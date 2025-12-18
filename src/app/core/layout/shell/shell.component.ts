import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';

@Component({
  selector: 'app-shell',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    RouterLink
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

}
