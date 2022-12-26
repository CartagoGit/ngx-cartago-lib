/*
 * Public API Surface of cartago-lib
 */

// export * from './lib/prueba/cartago-lib.service';
// export * from './lib/prueba/cartago-lib.component';
// export * from './lib/prueba/cartago-lib.module';

//!! Archivo de configuracion con la jerarquia de los elementos de la libreria
export * from './config/config';

//!! Principal Modulo
export * from './lib/cartago-library.module';

//$ Modulo con los componentes
export * from './lib/components/components.module';

//? Modulo de componentes puros
export * from './lib/components/pures/pures.module';
//* Componentes puros
export * from './lib/components/pures/button/button.component';
