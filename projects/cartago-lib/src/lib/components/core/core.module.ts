import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ElementLibraryComponent } from './element-library/element-library.component';
import { PuresModule } from '../pures/pures.module';

@NgModule({
  declarations: [CatalogueComponent, ElementLibraryComponent],
  imports: [CommonModule, PuresModule],
  exports: [CatalogueComponent, ElementLibraryComponent],
})
export class CoreModule {}
