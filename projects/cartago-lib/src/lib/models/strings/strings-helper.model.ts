

/**
 * ? Interfaz de las opciones a recibir
 * @export
 * @interface IFormatConverterOptions
 * @typedef {IFormatConverterOptions}
 */
export interface IFormatConverterOptions {
  everyWordUppercase?: boolean;
  everyWordLowercase?: boolean;
  needTrim?: boolean;
}



/**
 * ? Interfaz de las opciones del las listas formateadas
 * @export
 * @interface IListFormatedOptions
 * @typedef {IListFormatedOptions}
 */
export interface IListFormatedOptions {
	lang?: string;
	type?: Intl.ListFormatType;
	objectListedBy?: 'key' | 'value';
}
