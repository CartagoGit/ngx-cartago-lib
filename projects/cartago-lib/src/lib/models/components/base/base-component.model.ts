import { EventEmitter, Input, Output, Component } from '@angular/core';
import { classNameConverter } from '../../../helpers/strings/converters';
import { ENVIRONMENTS } from '../../../../config/environments';

export interface BaseComponent {
	onInit?(): void;
}

@Component({
	template: '',
})
export abstract class BaseComponent {
	// ANCHOR - Variables

	// GROUP - Variables fijas
	//#region
	/**
	 * ? Nombre de la base de la clase principal
	 */
	protected _classCssName: string = '';

	protected _prefix: string = ENVIRONMENTS.PREFIX;

	protected _type: string = ENVIRONMENTS.TYPES.COMPONENT;

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
	 * ? Clases a inyectar en el botón desde el template
	 */
	@Input() classes: string[] = [];

	/**
	 * ? Clases inyectadas por propiedades bindeadas
	 */
	protected _bindedClasses: string[] = [];

	//!GROUP - FIN - Inputs
	//#endregion

	// GROUP - Setters & Getters
	//#region
	/**
	 * ? Recupera las clases predefinidas del componente desde el template
	 * @public
	 * @readonly
	 */
	public get getClasses(): string[] {
		return [this._classCssName, ...this._bindedClasses, ...this.classes];
	}

	/**
	 * ? Recupera los estilos predefinidos desde el componente
	 * @public
	 * @readonly
	 */
	public get getStyles(): object {
		return { ...this.styles };
	}

	//!GROUP - FIN - Setters & Getters
	// ANCHOR - Constructor
	constructor() {
		//* Crea la base para la clase css del componente
		this._classCssName = classNameConverter(
			this.constructor.name,
			'component',
			this._prefix
		);
	}

	ngOnInit(): void {
		//* Llamar al método tras inidicarse paraa añadir las clases de propiedades del componente
		this._addClasses();
		!!this.onInit && this.onInit();
	}

	// ANCHOR - Métodos

	//GROUP - Utils para setters
	//#region
	/**
	 * ? Añade un método a implementar obligatoriamente por sus hijos para añadir las clases de las propiedades bindeadas
	 * @abstract
	 * @info  Usar con:
	 * @methods - protected _addClassModifiersCss(modifiers: string[]): void
	 * - protected _addClassElementsCss(elements: string[]): void
	 * - protected _addClassBlockCss(blocks: { element?: string; modifier?: string }[]): void
	 */
	protected abstract _addClasses(): void;

	/**
	 * ? Crea un string con el nombre de la clase css segun el elemento y sus modificadores
	 * @protected
	 * @param {?string} [element]
	 * @param {?string} [modifier]
	 * @returns {string}
	 */
	protected _createClassCss(element?: string, modifier?: string): string {
		return (
			this._classCssName +
			(!!element ? '__' + element : '') +
			(!!modifier ? '--' + modifier : '')
		);
	}

	/**
	 * ? Añade una clase a la lista de clases segun el nombre del componente, el elemento del componente y su modificador
	 * @protected
	 * @param {string} element Elemento del componente al que se aplica el moficiador
	 * @param {string} modifier Modificador del nombre de la clase
	 */
	protected _addClassCss(element?: string, modifier?: string): void {
		this._bindedClasses.push(this._createClassCss(element, modifier));
	}

	/**
	 * ? Añade clases de un conjunto de modificadores
	 * @protected
	 * @param {[]} modifiers
	 */
	protected _addClassModifiersCss(modifiers: string[]): void {
		modifiers.forEach((modifier) => this._addClassCss(undefined, modifier));
	}

	/**
	 * ? Añade clases de un conjunto de elementos
	 * @protected
	 * @param {[]} elements
	 */
	protected _addClassElementsCss(elements: string[]): void {
		elements.forEach((element) => this._addClassCss(element));
	}

	/**
	 * ? Añade clases de un conjunto de blockes, de un elemento con su modificador
	 * @protected
	 * @param {{ element?: string; modifier?: string }[]} blocks
	 */
	protected _addClassBlockCss(
		blocks: { element?: string; modifier?: string }[]
	): void {
		blocks.forEach((block) =>
			this._addClassCss(block.element, block.modifier)
		);
	}

	//!GROUP - FIN - Utils para setters
	//#endregion
}
