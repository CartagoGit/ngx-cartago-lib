import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CatalogueConfig } from '../../../../config/config';
import { ILibraryElement } from '../../../../config/config.model';

@Component({
  selector: 'cn-component-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent {
  // ANCHOR - Variables
  /**
   * ? Archivo con la configuracion de la libreria a mostrar en el catalogo
   */
  @Input() hierarchy!: typeof CatalogueConfig;

  /**
   * ? Tipo de la categoria seleccionada de la
   */
  private _selectedType: keyof typeof CatalogueConfig = 'components';
  set selectedType(value: keyof typeof CatalogueConfig) {
    this._selectedType = value;
    this.selectedList = this.hierarchy[value];
  }

  /**
   * ? Categoria seleccionada de la libreria
   */
  public selectedList: ILibraryElement[] = [];

  // ANCHOR - Constructor
  constructor(private _titleSvc: Title) {
    this._titleSvc.setTitle('Catalogo de la Libreria');
  }

  ngAfterViewInit(): void {
    this.selectedList = this.hierarchy[this._selectedType];
  }

  // ANCHOR - Métodos
}
