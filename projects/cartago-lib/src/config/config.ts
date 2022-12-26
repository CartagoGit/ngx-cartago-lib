import { LibraryConfig } from './config.model';

const config = new LibraryConfig();

config.components.push({
  name: 'Elemento de prueba',

  description: 'Es un simple elemento de prueba',
});
config.components.push({
  name: 'Elemento de prueba 2 ',

  description: 'Es un simple elemento de prueba 2',
});
config.helpers.push({
  name: 'esto seria un helper',
});

export { config as CatalogueConfig };
