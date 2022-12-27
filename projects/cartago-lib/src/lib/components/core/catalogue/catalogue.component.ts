import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CatalogueConfig } from '../../../../config/config';
import { ILibraryElement } from '../../../../config/config.model';

@Component({
  selector: 'cn-component-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
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
    this.isConfigSelected = false;
    if (value !== 'config')
      this.selectedList = this.hierarchy[value] as ILibraryElement[];
    else this.isConfigSelected = true;
  }

  /**
   * ? Categoria seleccionada de la libreria
   */
  public selectedList: ILibraryElement[] = [];

  /**
   * ? Boolean para saber si se ha seleccionado mostrar la configuracion en el catalogo
   */
  public isConfigSelected: boolean = false;

  // ANCHOR - Constructor
  constructor(private _titleSvc: Title) {
    this._titleSvc.setTitle('Catalogo de la Libreria');
  }

  ngAfterViewInit(): void {
    this.selectedType = this._selectedType;
  }

  // ANCHOR - Métodos
}
