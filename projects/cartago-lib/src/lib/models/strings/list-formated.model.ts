

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
