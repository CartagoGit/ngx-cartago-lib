import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, ComponentsModule],
  exports: [ComponentsModule],
})
export class CartagoLibraryModule {}
