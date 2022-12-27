import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ILibraryElement,
  LibraryConfig,
  TLibraryType,
} from '../../../../config/config.model';
import { capitalizeConverter } from '../../../helpers/strings/converters';

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
  @Input() hierarchy!: LibraryConfig;

  /**
   * ? Tipo de la categoria seleccionada de la
   */
  private _selectedType: string = 'components';
  set selectedType(value: string) {
    this._selectedType = value;
    if (value !== 'config' && value !== 'all')
      this.selectedList = this.hierarchy[
        value as TLibraryType
      ] as ILibraryElement[];
    else if (value === 'config') {
      this.selectedList = [this.hierarchy[value]];
    }
  }
  get selectedType() {
    return this._selectedType;
  }

  /**
   * ? Categoria seleccionada de la libreria
   */
  public selectedList: ILibraryElement[] = [];

  /**
   * ? Tipos de elementos de la libreria
   */
  public listTypes: string[] = [];

  /**
   * ? Texto para mostrar todos
   */
  public all: string = 'all';

  // ANCHOR - Constructor
  constructor(private _titleSvc: Title) {}

  ngOnInit(): void {
    this._titleSvc.setTitle('Catalogo de la Libreria');
    //* Precargamos la lista de tipos
    this.listTypes.push(this.all);
    this.listTypes = [
      ...this.listTypes,
      ...Object.getOwnPropertyNames(this.hierarchy),
    ];
    this.listTypes = this.listTypes.map((type) => capitalizeConverter(type));

    //* Para forzar el setter en el momento que se han construido los elementos
    this.selectedType = this._selectedType;
  }

  // ANCHOR - Métodos


  /**
   * ? Click en cualquiera de lo tipos
   * @public
   * @param {string} type
   */
  public clickType(type: string): void {
    this.selectedType = type.toLowerCase();
    console.log(this.selectedType);
  }
}
