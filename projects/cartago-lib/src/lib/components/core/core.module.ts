import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ElementLibraryComponent } from './element-library/element-library.component';

@NgModule({
  declarations: [CatalogueComponent, ElementLibraryComponent],
  imports: [CommonModule],
  exports: [CatalogueComponent, ElementLibraryComponent],
})
export class CoreModule {}
