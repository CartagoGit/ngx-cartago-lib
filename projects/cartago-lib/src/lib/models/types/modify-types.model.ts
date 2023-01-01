/**
 * ? Elimina el prefijo (en string) de cada uno de los tipos
 * @example Ejemplo : type prueba = IRemovePrefixInType<Tipo, 'Texto a eliminar'>
 */
export type IRemovePrefixInType<Type extends string, Prefix extends string> =
	Type extends `${Prefix}${infer Subfix}` ? Subfix : Type;

/**
 * ? Elimina el sufijo (en string) de cada uno de los tipos
 * @example Ejemplo : type prueba = IRemoveSubfixInType<Tipo, 'Texto a eliminar'>
 */
export type IRemoveSubfixInType<Type extends string, Subfix extends string> =
	Type extends `${infer Prefix}${Subfix}` ? Prefix : Type;

/**
 * ? Convierte el tipado a mayúsculas
 * @example Ejemplo: type prueba = IConvertToUpperCase<Tipo>
 */
export type IConvertToUppercase<Type extends string> = Uppercase<string & Type>;

/**
 * ? Convierte el tipado a minúsculas
 * @example Ejemplo: type prueba = IConvertToLowerCase<Tipo>
 */
export type IConvertToLowercase<Type extends string> = Lowercase<string & Type>;

/**
 * ? Convierte la primera letra de un tipado a mayúsculas
 * @example Ejemplo: type prueba = IConvertToCapitalize<Tipo>
 */
export type IConvertToCapitalize<Type extends string> = Capitalize<
	string & Type
>;

/**
 * ? Convierte el tipo en singular eliminando la ultima s cada tipo
 * @example Ejemplo: type prueba = IConvertToSingular<Tipo>
 */
export type IConvertToSingular<Type extends string> = IRemoveSubfixInType<
	Type,
	's'
>;
