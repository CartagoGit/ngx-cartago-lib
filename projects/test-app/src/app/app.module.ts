import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartagoLibraryModule } from 'cartago-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CartagoLibraryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
