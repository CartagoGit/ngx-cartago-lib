import { getFileData } from '../lib/helpers/strings/get-file-data';
import { proxyArrayObserver } from '../lib/helpers/helpers';
import { IFileData } from '../lib/models/file.model';

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
  type?: TLibraryType;
  element?: any;
  file?: IFileData;
  subtype?: 'pures' | 'compounds' | 'core';
  description?: string;
  details?: any;
}

/**
 * ? Interfaz del modelo de la configuracion de Jerarquías
 */
export type ILibraryConfig = {
  [key in TLibraryType]: ILibraryElement[];
};

// export interface ILibraryConfig extends ILibraryTypeConfig {
//   config: ILibraryElement;
// }

/**
 * ? Clase de la configuracion de la Librería
 */
export class LibraryConfig implements ILibraryConfig {
  // ANCHOR - Variables
  public components: ILibraryElement[] = [];
  public utils: ILibraryElement[] = [];
  public services: ILibraryElement[] = [];
  public models: ILibraryElement[] = [];
  public pipes: ILibraryElement[] = [];
  public directives: ILibraryElement[] = [];
  public helpers: ILibraryElement[] = [];
  public styles: ILibraryElement[] = [];

  public config: ILibraryElement = { name: 'config' };

  // ANCHOR - Constructor
  constructor() {
    this._proxyArrayMethods();
  }

  //ANCHOR - Métodos

  /**
   * ? Proxy para cada array para añadir un listener cada vez que se opere con alguno de los array
   */
  private _proxyArrayMethods = () => {
    //* Añadimos el Listener a cada array de la clase
    Object.entries(this).forEach(([key, array]) => {
      if (Array.isArray(array)) {
        this[key as TLibraryType] = proxyArrayObserver(array, (elem) =>
          this._changerType(elem, key as TLibraryType)
        );
      }
    });
  };

  /**
   * ? Formatea el elemento, su nombre el nombre del componente al modificarlo en el array
   * ? Listener/Callback a añadir al proxy cuando los arrays cambien
   * @param {ILibraryElement} elem
   * @param {TLibraryType} prop
   * @returns {ILibraryElement} - Retorna el
   */
  private _changerType = (
    elem: ILibraryElement,
    prop: TLibraryType
  ): ILibraryElement => {
    elem.file = getFileData(elem.name, { type: prop }, this);

    // getFileData(
    //   { name: 'no es un elemento', type: 'un elemento sin tipo' },
    //   this
    // );

    //   //* Añadimos el tipo del elemento segun el array donde ha sido colocado
    //   elem.type = prop;
    //   const subextension = singularConverter(elem.type);
    //   //* Creamos los nombres del archivo y sus extensiones
    //   const dataExtension = fileNameConverter(
    //     elem.name,
    //     'kebab-case',
    //     subextension
    //   );
    //   elem.file = dataExtension.fileName;
    //   elem.fileExtension = dataExtension.extension;
    //   elem.fileNameWithSubextension = dataExtension.nameWithSubextension;
    //   elem.fileNameFormated = dataExtension.nameFormated;
    //   elem.element =
    //     fileNameConverter(elem.name, 'PascalCase').nameFormated +
    //     singularConverter(
    //       fileNameConverter(elem.type, 'PascalCase').nameFormated
    //     );
    //   //* Creamos el source del elemento
    //   elem.source =
    //     './lib/' +
    //     prop +
    //     '/' +
    //     (!!elem.subtype ? elem.subtype + '/' : '') +
    //     elem.file;
    return elem;
  };
}
