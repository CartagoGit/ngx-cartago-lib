import { IFormatConverterOptions } from '../../models/strings-helper.model';

/**
 * ? Convierte un string al tipo de formato
 * @param {string} name
 * @param {(| 'camelCase'
    | 'PascalCase'
    | 'snake_case'
    | 'kebab-case')} [typeConverter='kebab-case']
 * @param {IFormatConverterOptions} [options={
    everyWordUppercase: false,
    everyWordLowercase: true,
    needTrim: true,
  }]
 * @returns {string}
 */
export const formatConverter = (
  name: string,
  typeConverter:
    | 'camelCase'
    | 'PascalCase'
    | 'snake_case'
    | 'kebab-case' = 'kebab-case',
  options: IFormatConverterOptions = {
    everyWordUppercase: false,
    everyWordLowercase: true,
    needTrim: true,
  }
): string => {
  name = separatorUpperCaseConverter(name);
  return name
    .trim()
    .split(' ')
    .map((word, index, array) => {
      options.needTrim && (word = word.trim());
      options.everyWordLowercase && (word = word.toLowerCase());
      options.everyWordUppercase && (word = word.toUpperCase());
      console.log(word, array);
      if (index === 0 && typeConverter === 'camelCase') return word;
      else if (typeConverter === 'PascalCase' || typeConverter === 'camelCase')
        return capitalizeConverter(word);
      else if (index === array.length - 1) return word;
      else return typeConverter === 'snake_case' ? word + '_' : word + '-';
    })
    .join('');
};

/**
 * ? Elimina la S final del plural de un string
 * @param {string} word
 * @returns {string}
 */
export const singularConverter = (word: string): string => {
  return word.trim().slice(0, word.length - 1);
};

/**
 * ? Añade la S final del plural de un string
 * @param {string} word
 * @returns {string}
 */
export const pluralConverter = (word: string): string => {
  return word.trim() + 's';
};

/**
 * ? Convierte en mayúsculas la primera letra de un string
 * @param word
 * @returns
 */
export const capitalizeConverter = (word: string): string => {
  return word.trim().charAt(0).toUpperCase() + word.slice(1);
};

/**
 * ? Separa las palabras que empiezan por mayusculas en un string
 * @param {string} word
 * @returns {string}
 */
export const separatorUpperCaseConverter = (word: string): string => {
  return word.split(/(?=[A-Z])/).join(' ');
};
