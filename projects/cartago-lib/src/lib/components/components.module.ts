import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuresModule } from './pures/pures.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PuresModule],
  exports: [PuresModule],
})
export class ComponentsModule {}
