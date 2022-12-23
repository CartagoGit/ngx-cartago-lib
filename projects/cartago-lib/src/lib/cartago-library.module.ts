import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { UtilsModule } from './utils/utils.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, ComponentsModule, UtilsModule],
  exports: [ComponentsModule, UtilsModule],
})
export class CartagoLibraryModule {}
