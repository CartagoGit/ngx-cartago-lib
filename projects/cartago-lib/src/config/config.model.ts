import { getFileData } from '../lib/helpers/strings/get-file-data';
import { proxyArrayObserver } from '../lib/helpers/helpers';
import { IFileData } from '../lib/models/files.model';
import {
	IConvertToUppercase,
	IConvertToSingular,
} from '../lib/models/types/helpers.model';

/**
 * ? Tipos de elementos de la libreria
 */
export type ILibraryType =
	| 'components'
	| 'utils'
	| 'services'
	| 'models'
	| 'pipes'
	| 'directives'
	| 'helpers'
	| 'styles'
	| 'guards'
	| 'interceptors';

/**
 * ? Tipado de constantes del environment
 * @export
 * @typedef {ILibraryTypeConstants}
 */

export type ILibraryTypeConstants = {
	[key in ILibraryType as IConvertToUppercase<
		IConvertToSingular<key>
	>]: IConvertToSingular<key>;
};

/**
 * ? Interfaz de cada elemento de la libreria
 */
export interface ILibraryElement {
	name: string;
	fileData?: IFileData;
	description?: string;
	details?: any;
	image?: string;
	functions?: { name: string; code: string; description: string }[];
}

/**
 * ? Interfaz del modelo de la configuracion de Jerarquías
 */
export type ILibraryConfig = {
	[key in ILibraryType]: ILibraryElement[];
};

/**
 * ? Clase de la configuracion de la Librería
 */
export class LibraryConfig implements ILibraryConfig {
	// ANCHOR - Variables
	public components: ILibraryElement[] = [];
	public utils: ILibraryElement[] = [];
	public services: ILibraryElement[] = [];
	public pipes: ILibraryElement[] = [];
	public directives: ILibraryElement[] = [];
	public interceptors: ILibraryElement[] = [];
	public guards: ILibraryElement[] = [];
	public models: ILibraryElement[] = [];
	public helpers: ILibraryElement[] = [];
	public styles: ILibraryElement[] = [];

	public config: ILibraryElement = { name: 'config' };

	// ANCHOR - Constructor
	constructor() {
		this._proxyArrayMethods();
	}

	//ANCHOR - Métodos

	/**
	 * ? Proxy para cada array para añadir un listener cada vez que se opere con alguno de los array
	 */
	private _proxyArrayMethods() {
		//* Añadimos el Listener a cada array de la clase
		Object.entries(this).forEach(([key, array]) => {
			if (Array.isArray(array)) {
				this[key as ILibraryType] = proxyArrayObserver(array, (elem) =>
					this._changerType(elem, key as ILibraryType)
				);
			}
		});
	}

	/**
	 * ? Formatea el elemento, su nombre el nombre del componente al modificarlo en el array
	 * ? Listener/Callback a añadir al proxy cuando los arrays cambien (pop, unshift. shift, delete, asign...)
	 * @param {ILibraryElement} elem
	 * @param {ILibraryType} prop
	 * @returns {ILibraryElement} - Retorna el elemento formateado cada vez que se haga un push o un cambio en el array
	 */
	private _changerType(
		elem: ILibraryElement,
		prop: ILibraryType
	): ILibraryElement {
		elem.fileData = getFileData(
			elem.name,
			{ ...elem.fileData, type: prop },
			this
		);
		return elem;
	}
}
