import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuresModule } from './pures/pures.module';
import { CoreModule } from './core/core.module';
import { CompoundsModule } from './compounds/compounds.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PuresModule, CompoundsModule, CoreModule],
  exports: [PuresModule, CompoundsModule, CoreModule],
})
export class ComponentsModule {}
