import { TLibraryType } from '../../../config/config.model';
import {
  IFileDataArgs,
  IFileData,
  IFileDataCreated,
} from '../../models/file.model';
import { isKeyInObject, formatConverter, singularConverter } from '../helpers';

export const getFileData = (name: string, data: IFileDataArgs, object: any) => {
  Object.values(data).map((elem) => elem);
  const { type, subtype, extension = 'ts', subextension, from } = data;
  const file: { [key in keyof IFileDataCreated]?: string } = {
    fileName: getFileName(name),
    folder: getFileFolder(from, type, subtype),
  };

  // console.log(isType(type));
  // console.log(isType());
  // console.log((type is TLibraryType));

  //* Metodo que van a ejecutar
  const defaulMethodType = () => {
    data.subextension = type && singularConverter(type);
  };

  const methodType: { [key in TLibraryType]?: () => void } = {
    helpers: () => {
      data.subextension = undefined;
    },
    styles: () => {
      data.subextension = undefined;
    },
  };

  //* Comprobamos si el tipo pertenece a los tipos del objeto
  if (!!type && isKeyInObject(object, type as string)) {
    defaulMethodType();
    const typeLibrary = type as TLibraryType;
    !!methodType[typeLibrary!] && //* Comprueba si hay metodo especifico para el tipo
      methodType[typeLibrary!]!()!;
  } else defaulMethodType(); //* Si no hay tipo hacer el defecto

  console.log(type, methodType[type! as TLibraryType]);

  // !!type
  //   ?

  return {
    ...data,
    extension,
    ...file,
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
