import { formatConverter, singularConverter } from './converters';
import { TLibraryType } from '../../../config/config.model';

export const getFileData = (
  name: string,
  type?: TLibraryType,
  subtype?: string,
  subextension?: string,
  extension: string = 'ts',
  from?: string
) => {
  name = getFileName(name);

  const defaulMethodType = (folder = 'lib') => {
    subextension = type && singularConverter(type);
    extension = 'ts';
    from = folder;
    console.log(2);
  };

  const methodType: { [key in TLibraryType]?: () => void } = {
    helpers: () => {
      console.log(1);
    },
  };

  console.log(type, methodType[type!]);
  !!methodType[type!] ? methodType[type!]!()! : defaulMethodType(from);
};

/**
 * ? Recupera el nombre de del archivo en kebab-case
 * @param {string} name
 * @returns {string}
 */
export const getFileName = (name: string): string => {
  return formatConverter(name);
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

export const getFileSource = () => {};

export const getFileFolder = () => {};
