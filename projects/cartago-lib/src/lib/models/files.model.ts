import { ILibraryType } from '../../config/config.model';

/**
 * ? Interfaz de los datos a recibir para formatear los datos del fichero
 */
export interface IFileDataArgs {
  type?: ILibraryType | string;
  subtype?: 'pures' | 'compounds' | 'core';
  subextension?: string;
  extension?: string;
  from?: string;
}

/**
 * ? Interfaz de datos a crear segun la información recibida en getFileData()
 */
export interface IFileDataCreated {
  file?: string;
  path?: string;
  fileName?: string;
  fileWithSubextension?: string;
  source?: string;
  elementName?: string;
  selector?: string;
  styles?: {
    file?: string;
    source?: string;
  };
  template?: {
    file?: string;
    source?: string;
  };
}

/**
 * ? Interfaz de los datos de la informacion del archivo
 */
export type IFileData = IFileDataArgs & IFileDataCreated;
