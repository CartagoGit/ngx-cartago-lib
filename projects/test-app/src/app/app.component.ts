import { Component } from '@angular/core';
import { LibraryConfig } from 'cartago-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'testApp';

  public hierarchy = LibraryConfig;
}
