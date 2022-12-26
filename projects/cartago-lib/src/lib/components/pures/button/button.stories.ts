

import { Meta, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default
{component : ButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: []
    })
  ],
  title: 'Componentes/Básicos'

} as Meta
