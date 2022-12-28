import { ILibraryTypeConstants } from './config.model';

/**
 * ? Lista de constantes de entorno
 */
export const ENVIRONMENTS = {
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
