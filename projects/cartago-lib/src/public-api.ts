/*
 * Public API Surface of cartago-lib
 */

// export * from './lib/prueba/cartago-lib.service';
// export * from './lib/prueba/cartago-lib.component';
// export * from './lib/prueba/cartago-lib.module';

//!! Archivo de configuracion con la jerarquia de los elementos de la libreria
export * from './config/config';

//!! Archivos y funciones de utilidad o helpers
export * from './lib/helpers/helpers';

//!! Principal Modulo
export * from './lib/cartago-library.module';

//$ Modulo con los componentes
export * from './lib/components/components.module';

//? Modulo de componentes core
export * from './lib/components/core/core.module';
//* Components del core
export * from './lib/components/core/catalogue/catalogue.component';
export * from './lib/components/core/element-library/element-library.component';

//? Modulo de componentes puros
export * from './lib/components/pures/pures.module';
//* Componentes puros
export * from './lib/components/pures/button/button.component';

//? Modulo de componentes compuestos
export * from './lib/components/compounds/compounds.module';
