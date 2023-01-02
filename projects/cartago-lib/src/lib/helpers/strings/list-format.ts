import { IListFormatedOptions } from '../../models/strings/strings-helper.model';

/**
 * ? Retorna una lista en string
 * *
 * @param {(object | Array<string | number>)} obj - Recibe un objeto o un array
 * @param {?IListFormatedOptions} [options]
 * @default options = {
 * 	lang: 'es', // Lenguaje
		type: 'conjunction', // 'conjunction' | 'disjunction' | 'unit'
		objectListedBy: 'key' //En caso de ser un objeto devuelve la lista de sus keys o de sus values
	}
 * @returns {string}
 */
const getListFormated = (
	obj: object | Array<string | number>,
	options?: IListFormatedOptions
): string => {
	//* Asignamos valores default a las opciones y sobreeescribimos las que vengan como parametro
	options = {
		lang: 'es',
		type: 'conjunction',
		objectListedBy: 'key',
		...options,
	};
	return new Intl.ListFormat(options.lang, {
		type: options.type,
	}).format(
		Array.isArray(obj)
			? obj
			: options.objectListedBy === 'key'
			? Object.keys(obj)
			: Object.values(obj)
	);
};
