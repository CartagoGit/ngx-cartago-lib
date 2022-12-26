/**
 * ? Convertidor de string a nombre de archivo, segun el typo de formato, su subextension, y su extension de archivo
 * @param {string} name
 * @param {(| 'camelCase'
    | 'PascalCase'
    | 'snake_case'
    | 'kebab-case')} [typeConverter='kebab-case']
 * @param {(string | undefined)} [subextension=undefined]
 * @param {string} [extension='ts']
 * @returns {fileName : string, nameFormated : string, nameWithSubextension : string}
 * - Retorna un objeto con el nombre formateado, el nombre completo del archivo, el nombre con la subextension formateada y la extension del archivo
 */
export const fileNameConverter = (
  name: string,
  typeConverter:
    | 'camelCase'
    | 'PascalCase'
    | 'snake_case'
    | 'kebab-case' = 'kebab-case',
  subextension?: string,
  extension: string = 'ts'
): {
  fileName: string;
  nameFormated: string;
  nameWithSubextension: string;
  extension: string;
} => {
  const nameFormated = name
    .split(' ')
    .map((word, index, array) => {
      word = word.toLowerCase();
      if (index === 0 && typeConverter === 'camelCase') return word;
      else if (typeConverter === 'PascalCase' || typeConverter === 'camelCase')
        return word.charAt(0).toUpperCase() + word.slice(1);
      else if (index === array.length - 1) return word;
      else return typeConverter === 'snake_case' ? word + '_' : word + '-';
    })
    .join('');
  const nameWithSubextension = !!subextension
    ? nameFormated + '.' + subextension
    : nameFormated;
  const fileName = nameWithSubextension + '.' + extension;
  return { fileName, nameFormated, nameWithSubextension, extension };
};
