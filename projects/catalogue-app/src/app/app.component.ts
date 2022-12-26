import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CatalogueConfig } from 'cartago-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public hierarchy = CatalogueConfig;


}
