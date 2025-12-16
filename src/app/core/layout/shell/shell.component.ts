import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-shell',
    imports: [
        FooterComponent,
        HeaderComponent,
        RouterOutlet
    ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

}
