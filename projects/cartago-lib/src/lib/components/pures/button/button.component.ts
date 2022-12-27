import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../../models/components/base/base-component.model';

@Component({
  selector: 'cn-component-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent extends BaseComponent implements OnInit {
  // ANCHOR - Variables

  // /**
  //  * ? Nombre de la base de la clase principal
  //  */
  // private _className: string = 'cn-button';

  // /**
  //  * ?Evento a emitir cuando se pulse el botón
  //  */
  // @Output() onClick: EventEmitter<Event> = new EventEmitter();

  // /**
  //  * ? Texto a mostrar en el botón
  //  */
  // @Input() label: string = '';

  // /**
  //  * ? Estilos a inyectar en el botón
  //  */
  // @Input() styles: object = {};

  // /**
  //  * ? Clases a inyectar en el botón
  //  */
  // @Input() clases: string[] = [];

  /**
   * ? Tamaños predefinidos del botón
   * @type {('small' | 'medium' | 'large')}
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * ? Recupera las clases predefinidas al botón desde el template
   * @public
   * @readonly
   */
  public override get getClasses(): string[] {
    return [
      this._className,
      `${this._className}--${this.size}`,
      ...this.classes,
    ];
  }

  // /**
  //  * ? Recupera los estilos predefinidos desde el boton
  //  * @public
  //  * @readonly
  //  */
  // public get getStyles(): object {
  //   return { ...this.styles };
  // }

  // ANCHOR - Constructor
  constructor() {
    super();
  }

  ngOnInit(): void {}

  //ANCHOR - Métodos
}
