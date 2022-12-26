import { LibraryConfig } from './config.model';

const config = new LibraryConfig();

config.components.push({
  name: 'Elemento de prueba',
  fileData: { subtype: 'pures' },

  description: 'Es un simple elemento de prueba',
});
config.components.push({
  name: 'Elemento de prueba 2 ',

  description: 'Es un simple elemento de prueba 2',
});
config.utils.push({
  name: 'Elemento de prueba 2 ',

  description: 'Es un simple elemento de prueba 2',
});
config.services.push({
  name: 'Elemento de prueba 2 ',

  description: 'Es un simple elemento de prueba 2',
});
config.models.push({
  name: 'Elemento de prueba 2 ',

  description: 'Es un simple elemento de prueba 2',
});
config.pipes.push({
  name: 'Elemento de prueba 2 ',

  description: 'Es un simple elemento de prueba 2',
});
config.directives.push({
  name: 'Elemento de prueba 2 ',

  description: 'Es un simple elemento de prueba 2',
});
config.styles.push({
  name: 'Elemento de prueba 2 ',

  description: 'Es un simple elemento de prueba 2',
});
config.helpers.push({
  name: 'esto seria un helper',
});
config.helpers.push({
  name: 'esto seria un helper',
});

export { config as CatalogueConfig };
