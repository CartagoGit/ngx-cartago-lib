import { ILibraryType } from '../../../config/config.model';
import {
	IFileDataArgs,
	IFileData,
	IFileDataCreated,
} from '../../models/files/files.model';
import {
	isKeyInObject,
	formatConverter,
	singularConverter,
	capitalizeConverter,
} from '../helpers';



/**
 * ? Recibiendo unos argumentos devuelve la data completa del archivo (nombre, tipo, carpeta, source, etc)
 * @param {string} name - Nombre del elemento
 * @param {IFileDataArgs} data - datos del elemento necesarios para crear los datos del archivo del elemento
 * @param {*} object - Clase que contiene los tipos de elementos posibles
 * @returns {IFileData}
 */
export const getFileData = (
	name: string,
	data: IFileDataArgs,
	object: any
): IFileData => {
	let { type, subtype, extension = 'ts', subextension, from = 'lib' } = data;
	const file: IFileDataCreated = {
		fileName: getFileName(name),
		path: getFilePath(from, type, subtype),
	};

	//* Metodo que van a ejecutar todos los elementos
	const defaulMethodType = () => {
		subextension = !!type ? singularConverter(type) : subextension;
		file.elementName = getElementName(name, 'class');
	};

	//* Metodo para elementos propios de angular
	const angularMethodType = () => {
		//Nombre
		file.elementName =
			getElementName(name, 'class') +
			capitalizeConverter(singularConverter(type as string));
		//Selector
		type !== 'services' &&
			(file.selector =
				'cn-' + subextension + '-' + file.fileName?.toLowerCase());
	};

	//* Metodos especificos segun
	const methodType: { [key in ILibraryType]?: () => void } = {
		helpers: () => {
			subextension = subextension;
			file.elementName = getElementName(name, 'function');
		},
		styles: () => {
			subextension = undefined;
			file.elementName = getElementName(name, 'style');
		},
		utils: () => {
			subextension = undefined;
			file.elementName = getElementName(name, 'function');
		},
		models: () => {
			file.elementName = getElementName(name, 'class');
		},
	};

	//* Comprobamos si el tipo pertenece a los tipos del objeto
	if (!!type && isKeyInObject(object, type as string)) {
		defaulMethodType();
		const typeLibrary = type as ILibraryType;
		!!methodType[typeLibrary!] //* Comprueba si hay metodo especifico para el tipo
			? methodType[typeLibrary!]!()!
			: angularMethodType();
	} else defaulMethodType(); //* Si no hay tipo hacer el defecto

	//* Añadimos el dato del archivo con su subextension
	!!subextension &&
		(file.fileWithSubextension = getFileNameWithExtension(
			file.fileName!,
			subextension
		));

	//* Añadimos el nombre completo del archivo
	file.file = getFileNameWithExtension(
		!!file.fileWithSubextension ? file.fileWithSubextension : file.fileName!,
		extension
	);

	//* Añadimos la ruta completa del elemento
	file.source = getFileSource(file.file!, file.path!);

	//* Si es un componente añadimos el template y el estilo
	if (type === 'components') {
		file.styles = {};
		file.template = {};
		file.styles!.file = getFileNameWithExtension(
			file.fileWithSubextension!,
			'scss'
		);
		file.styles!.source = getFileSource(file.styles!.file, file.path!);

		file.template!.file = getFileNameWithExtension(
			file.fileWithSubextension!,
			'html'
		);
		file.template!.source = getFileSource(file.template!.file, file.path!);
	}

	return {
		type,
		subtype,
		subextension,
		from,
		extension,
		...file,
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

/**
 * ? Formatea el nombre del elemento segun el tipo de elemento
 * @param {string} name
 * @param {(| 'class'
		| 'method'
		| 'service'
		| 'function'
		| 'variable'
		| 'interfaz'
		| 'type'
		| 'constant'
		| 'style')} type
 * @returns {string}
 */
export const getElementName = (
	name: string,
	type:
		| 'class'
		| 'method'
		| 'service'
		| 'function'
		| 'variable'
		| 'interfaz'
		| 'type'
		| 'constant'
		| 'style'
): string => {
	if (type.match('/|class|service|pipe|directive|/i'))
		return formatConverter(name, 'PascalCase');
	else if (type.match('/|method|function|variable|/i'))
		return formatConverter(name, 'camelCase');
	else if (type.match('/|style|/i'))
		return formatConverter(name, 'kebab-case');
	else if (type.match('/|constant|/i'))
		return formatConverter(name, 'snake_case', {
			everyWordUppercase: type === 'constant',
			everyWordLowercase: type !== 'constant',
		});
	else if (type.match('/|interfaz|type|/i'))
		return 'I' + formatConverter(name, 'PascalCase');
	return name;
};

/**
 * ? Recupera el nombre del archivo añadiendole una extension
 * @param {string} name
 * @param {string} extension
 * @returns {string}
 */
export const getFileNameWithExtension = (
	name: string,
	extension: string
): string => {
	return name + '.' + extension;
};

/**
 * ? Devuelve la ruta segun su procedendia, su tipo y su subtipo
 * @param {?string} [from]
 * @param {?(ILibraryType | string)} [type]
 * @param {?string} [subtype]
 * @returns {string}
 */
export const getFilePath = (
	from?: string,
	type?: ILibraryType | string,
	subtype?: string
) => {
	return (
		'./' +
		(!!from ? from + '/' : '') +
		(!!type ? type + '/' : '') +
		(!!subtype ? subtype + '/' : '')
	);
};

/**
 * ? Dando la ruta y el nomobre del archivo completo, devuelve la ruta completa
 * @param nameWithExtensions
 * @param path
 * @returns
 */
export const getFileSource = (nameWithExtensions: string, path: string) => {
	return path + nameWithExtensions;
};
