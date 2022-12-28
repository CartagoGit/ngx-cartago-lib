import { ILibraryTypeConstants } from './config.model';

/**
 * ? Lista de constantes de entorno
 */
export const ENVIRONMENTS = {
	CREATED_BY: 'Cartago Nova',
	CREATED_BY_SUBNICK: 'Cartago',
	PREFIX: 'cn',
	TYPES: {
		COMPONENT: 'component',
		DIRECTIVE: 'directive',
		HELPER: 'helper',
		MODEL: 'model',
		PIPE: 'pipe',
		SERVICE: 'service',
		STYLE: 'style',
		UTIL: 'util',
		GUARD: 'guard',
		INTERCEPTOR: 'interceptor',
	} as ILibraryTypeConstants,
};
