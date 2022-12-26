import { LibraryConfig } from './config.model';

const config = new LibraryConfig();

config.components.push({
  name: 'Elemento de prueba',
  
  description: 'Es un simple elemento de prueba'
})

export { config as LibraryConfig };
