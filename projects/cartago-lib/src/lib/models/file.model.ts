import { TLibraryType } from '../../config/config.model';

/**
 * ? Interfaz de los datos a recibir para formatear los datos del fichero
 */
export interface IFileDataArgs {
  type?: TLibraryType | string;
  subtype?: string;
  subextension?: string;
  extension?: string;
  from?: string;
}

/**
 * ? Interfaz de datos a crear segun la información recibida en getFileData()
 */
export interface IFileDataCreated {
  file: string;
  folder: string;
  fileName: string;
  fileNameWithExtension: string;
  source: string;
  elementName: string;
}

/**
 * ? Interfaz de los datos de la informacion del archivo
 */
export type IFileData = IFileDataArgs & IFileDataCreated;

/**
 * ? Interfaz de los archivos de elementos de tipo componente
 */
export interface IFileDataComponent extends IFileData {
  fileStyle?: string;
  fileStyleSource?: string;
  fileTemplate?: string;
  fileTemplateSource?: string;
}
