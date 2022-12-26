/**
 * ? Comprueba si un string es una de las keys de un objeto
 * @param {*} obj
 * @param {string} word
 * @returns {boolean}
 */
export const isKeyInObject = (obj: any, word: string): boolean => {
  return !!obj ? Object.keys(obj).some((elem) => elem === word) : false;
};
