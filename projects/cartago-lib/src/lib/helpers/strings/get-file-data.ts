import { TLibraryType, LibraryConfig } from '../../../config/config.model';
import {
  IFileDataArgs,
  IFileData,
  IFileDataCreated,
} from '../../models/file.model';
import { isKeyInObject, formatConverter } from '../helpers';
// import { CatalogueConfig } from 'cartago-lib';

export const getFileData = (data: IFileDataArgs, obj : any) => {
  Object.values(data).map((elem) => elem);
  const { name, type, subtype, extension = 'ts', subextension, from } = data;
  const file: { [key in keyof IFileDataCreated]?: string } = {
    fileName: getFileName(name),
    folder: getFileFolder(from, type, subtype),
  };
  if (isKeyInObject(obj, type as string)){
    console.log('alla');
  }else console.log('koo');;

  // console.log(isType(type));
  // console.log(isType());
  // console.log((type is TLibraryType));

  // const defaulMethodType = (folder?: string) => {
  //   subextension = type && singularConverter(type);
  //   extension = 'ts';
  //   from = folder;
  //   console.log(2);
  // };

  // const methodType: { [key in TLibraryType]?: () => void } = {
  //   helpers: () => {
  //     console.log(1);
  //   },
  // };

  // console.log(type, methodType[type!]);
  // !!type
  //   ? defaulMethodType() //* Si no hay tipo hacer el defecto
  //   : !!methodType[type!] //* Comprueba si hay metodo especifico para el tipo
  //   ? methodType[type!]!()!
  //   : defaulMethodType(from);

  return {
    ...data,
    extension,

    // file: '',
    // source: '',
    // fileNameWithExtension: '',
    // fileName: getFileName(name),
    // folder: getFileFolder(from, type, subtype),
    // elementName: formatConverter(name, 'PascalCase'),
  } as IFileData;
};

/**
 * ? Recupera el nombre de del archivo en kebab-case
 * @param {string} name
 * @returns {string}
 */
export const getFileName = (name: string): string => {
  return formatConverter(name);
};

const getElementName = (name: string): string => {
  // return formatConverter(name, 'PascalCase')
  return '';
};

/**
 * ? Recupera el nombre del archivo con subextension
 * @param {string} name
 * @param {string} subextension
 * @returns {string}
 */
export const getFileNameWithSubextension = (
  name: string,
  subextension: string
) => {
  return name + '.' + subextension;
};

export const getFileFolder = (
  from?: string,
  type?: TLibraryType | string,
  subtype?: string
) => {
  return '';
};

export const getFileSource = () => {
  return '';
};
