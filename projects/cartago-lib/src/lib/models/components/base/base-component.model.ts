import { EventEmitter, Input, Output, Component } from '@angular/core';
import {
  separatorUpperCaseConverter,
  classNameConverter,
} from '../../../helpers/strings/converters';

@Component({
  template: '',
})
export class BaseComponent {
  // ANCHOR - Variables

  // GROUP - Variables fijas
  //#region
  /**
   * ? Nombre de la base de la clase principal
   */
  protected _className: string = '';

  // !GROUP - FIN - Variables Fijas
  //#endregion

  // GROUP - Outputs
  //#region
  /**
   * ?Evento a emitir cuando se clickee en el componente
   */
  @Output() onClick: EventEmitter<Event> = new EventEmitter();

  /**
   * ?Evento a emitir cuando el componente gana el foco
   */
  @Output() onFocus: EventEmitter<Event> = new EventEmitter();

  /**
   * ?Evento a emitir cuando el componente pierda el foco
   */
  @Output() onBlur: EventEmitter<Event> = new EventEmitter();

  /**
   * ?Evento a emitir cuando se pulse enter
   */
  @Output() onKeyEnter: EventEmitter<Event> = new EventEmitter();

  //!GROUP - FIN - Outputs
  //#endregion

  // GROUP - Inputs
  //#region

  /**
   * ? Texto a mostrar en el botón
   */
  @Input() label: string = '';

  /**
   * ? Estilos a inyectar en el botón
   */
  @Input() styles: object = {};

  /**
   * ? Clases a inyectar en el botón
   */
  @Input() classes: string[] = [];

  //!GROUP - FIN - Inputs
  //#endregion

  // GROUP - Setters & Getters
  //#region
  /**
   * ? Recupera las clases predefinidas al botón desde el template
   * @public
   * @readonly
   */
  public get getClasses(): string[] {
    return [this._className, ...this.classes];
  }

  /**
   * ? Recupera los estilos predefinidos desde el boton
   * @public
   * @readonly
   */
  public get getStyles(): object {
    return { ...this.styles };
  }

  //!GROUP - FIN - Setters & Getters
  // ANCHOR - Constructor
  constructor() {
    this._className = classNameConverter(
      this.constructor.name,
      'component',
      'cn'
    );
  }
}
