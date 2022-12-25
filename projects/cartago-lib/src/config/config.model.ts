/**
 * ? Tipos de elementos de la libreria
 */
export type TLibraryType =
  | 'components'
  | 'utils'
  | 'services'
  | 'models'
  | 'pipes'
  | 'directives'
  | 'helpers'
  | 'styles';

/**
 * ? Interfaz de cada elemento de la libreria
 */
export interface ILibraryElement {
  name: string;
  type: TLibraryType;
  element: any;
  description?: string;
  details?: any;
}

/**
 * ? Interfaz del modelo de la configuracion de Jerarquías
 */
export type ILibraryConfig = {
  [key in TLibraryType]: ILibraryElement[];
};

/**
 * ? Clase de la configuracion de la Librería
 */
// export class LibraryConfig implements ILibraryConfig {
export class LibraryConfig implements ILibraryConfig {
  // ANCHOR - Variables
  public components : ILibraryElement[] = [];
  public utils: ILibraryElement[] = [];
  public services: ILibraryElement[] = [];
  public models: ILibraryElement[] = [];
  public pipes: ILibraryElement[] = [];
  public directives: ILibraryElement[] = [];
  public helpers: ILibraryElement[] = [];
  public styles: ILibraryElement[] = [];

  // ANCHOR - Constructor
  constructor() {
    this._proxyArrayMethods();
  }

  //ANCHOR - Métodos
  private _proxyArrayMethods = () => {
    
  }
}

const config = new LibraryConfig();
// config.components.push('algo')
