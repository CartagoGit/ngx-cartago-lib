import {
	EventEmitter,
	Input,
	Output,
	Component,
	ElementRef,
	ViewChildren,
	QueryList,
	OnInit,
	AfterViewInit,
	SimpleChanges,
} from '@angular/core';
import { classNameConverter } from '../../../helpers/strings/converters';
import { ENVIRONMENTS } from '../../../../config/environments';

/**
 * ? Interfaz de clase combinada para hacer opcional onInit, etc en las clases que implementen BaseComponent
 * * Esta funcion sera llamada justo al terminar ngOnInit,etc con los elementos llamados desde BaseComponent
 */
export interface BaseComponent {
	cnOnInit?(): void;
	cnAfterViewInit?(): void;
	cnOnChanges?(changes: SimpleChanges): void;
	cnOnDestroy?(): void;
}

/**
 * ? Interfaz con lo datos a emitir al realizarse un evento en el componente
 */
interface IEventEmiterBase {
	elementName: string;
	component: string;
	event: Event;
	label: string;
	styles: object;
	ngClasses: string[];
	bindedClasses: string[];
	allClases: string[];
	eventType: string;
}

@Component({
	template: '',
})
export abstract class BaseComponent implements OnInit, AfterViewInit {
	// ANCHOR - Variables

	// GROUP - Variables fijas
	//#region
	/**
	 * ? Nombre de la base de la clase principal
	 */
	protected _classCssName: string = classNameConverter(
		this.constructor.name,
		ENVIRONMENTS.TYPES.COMPONENT,
		ENVIRONMENTS.PREFIX
	);

	/**
	 * ? Prefijo a usar en las clases de css
	 */
	protected readonly _prefix: string = ENVIRONMENTS.PREFIX;

	/**
	 * ? Tipo de elemento para añadir en la clase css
	 */
	protected readonly _type: string = ENVIRONMENTS.TYPES.COMPONENT;

	//GROUP-SECTION - Estáticos
	//#region

	/**
	 * ? Devuelve el nombre del selector del componente
	 * @static
	 */
	static getSelector(): string {
		return (
			ENVIRONMENTS.PREFIX +
			'-' +
			ENVIRONMENTS.TYPES.COMPONENT +
			'-' +
			classNameConverter(this.constructor.name)
		);
	}

	/**
	 * ? Devuelve el nombre de la clase del componente
	 * @static
	 */
	static getComponentName(): string {
		return this.constructor.name;
	}

	/**
	 * ? Devuelve el nombre de la clase css principal del componente
	 *  @static
	 * @returns
	 */
	static getClassCss(): string {
		return classNameConverter(
			this.constructor.name,
			ENVIRONMENTS.TYPES.COMPONENT,
			ENVIRONMENTS.PREFIX
		);
	}

	/**
	 * ? Devuelve el tipo del componente
	 * @static
	 * @returns {string}
	 */
	static getType() : string {
		return ENVIRONMENTS.TYPES.COMPONENT
	}

	/**
	 * ? Devuelve el prefijo de la libreria
	 * @returns
	 */
	static getPrefix(): string {
		return ENVIRONMENTS.PREFIX
	}

	//!GROUP-SECTION - FIN - Estáticos

	// !GROUP - FIN - Variables Fijas
	//#endregion

	// GROUP - Referencias
	//#region
	/**
	 * ? Recupera el elemento #cnBase
	 */
	@ViewChildren(`${ENVIRONMENTS.PREFIX}Base`)
	baseRef!: QueryList<ElementRef<HTMLElement>>;

	//!GROUP - FIN - Referencias
	//#endregion

	// GROUP - Outputs
	//#region
	/**
	 * ?Evento a emitir cuando se clickee en el componente
	 */
	@Output() onClick: EventEmitter<IEventEmiterBase> = new EventEmitter();

	/**
	 * ?Evento a emitir cuando el componente gana el foco
	 */
	@Output() onFocus: EventEmitter<IEventEmiterBase> = new EventEmitter();

	/**
	 * ?Evento a emitir cuando el componente pierda el foco
	 */
	@Output() onBlur: EventEmitter<IEventEmiterBase> = new EventEmitter();

	/**
	 * ?Evento a emitir cuando se pulse enter
	 */
	@Output() onKeyEnter: EventEmitter<IEventEmiterBase> = new EventEmitter();

	/**
	 * ?Evento a emitir cuando se cambie el valor del input
	 */
	@Output() onInput: EventEmitter<IEventEmiterBase> = new EventEmitter();

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
	@Input() styles!: { [key in string]: string };

	/**
	 * ? Clases a inyectar en el botón desde el template
	 */
	@Input() classes: string[] = [];

	//!GROUP - FIN - Inputs
	//#endregion

	// GROUP - Generales
	//#region
	/**
	 * ? Clases inyectadas por propiedades bindeadas
	 */
	protected _bindedClasses: string[] = [];

	/**
	 * ? Atributos que se añadiran al iniciar el componente y se eliminaran al destruir el componente
	 */
	protected _baseAttributes!: { [key in string]: string };

	/**
	 * ? Eventos que se añadiran al iniciar el componente y se eliminaran al destruir el componente
	 */
	protected _baseEvents!: { [key in string]: (event: Event) => void };

	//!GROUP - FIN - Generales
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

	/**
	 * ? Devuelve el nombre de css del componente
	 * @public
	 * @readonly
	 * @type {string}
	 */
	public get getClassCssName(): string {
		return this._classCssName;
	}

	//!GROUP - FIN - Setters & Getters

	// ANCHOR - Constructor
	constructor() {}

	/**
	 * ? No se recomienda  hacer override en las clases que implementen
	 * ? En su lugar hacer override al método this.onInit();
	 */
	ngOnInit(): void {
		//* Llamar al método tras inidicarse paraa añadir las clases de propiedades del componente
		this._addClasses();
		!!this.cnOnInit && this.cnOnInit();
	}

	/**
	 * ? No se recomienda  hacer override en las clases que implementen
	 * ? En su lugar hacer override al método this.cnAfterViewInit();
	 */
	ngAfterViewInit(): void {
		//** Si existen elementos base en el template con #cnBase añadirle las propiedades y eventos
		for (const elem of this.baseRef) {
			!!elem.nativeElement && this._createBaseProperties(elem.nativeElement);
		}
		!!this.cnAfterViewInit && this.cnAfterViewInit();
	}

	/**
	 * ? No se recomienda  hacer override en las clases que implementen
	 * ? En su lugar hacer override al método this.cnOnChanges();
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['classes'] && !!this.baseRef) {
			this._assignStylesAndClassesCss();
		}
		!!this.cnOnChanges && this.cnOnChanges(changes);
	}

	/**
	 * ? No se recomienda  hacer override en las clases que implementen
	 * ? En su lugar hacer override al método this.cnOnDestroy();
	 */
	ngOnDestroy(): void {
		//* Elimina todos los Listeneres y eventos al eliminar el componente
		if (!!this.baseRef && !!this._baseEvents) {
			for (const elem of this.baseRef) {
				const baseHtml = elem.nativeElement;
				for (const [index, event] of Object.entries(this._baseEvents)) {
					baseHtml.removeEventListener(index, event);
				}
			}
		}
		!!this.cnOnDestroy && this.cnOnDestroy();
	}

	// ANCHOR - Métodos

	// GROUP - Implementaciones
	//#region

	/**
	 * ? Asigna los atributos a la base
	 */
	protected _assignAttributes(): void {
		this._baseAttributes = {
			[this._type + '-name']: this.getClassCssName,
			class: this.getClasses.join(' '),
		};
	}

	/**
	 * ? Asigna los eventos a la base
	 */
	protected _assignEvents(): void {
		//* Datos a emitir cuando se realice un evento en el componente
		const emitter = {
			allClases: this.getClasses,
			ngClasses: this.classes,
			bindedClasses: this._bindedClasses,
			elementName: this._classCssName,
			label: this.label,
			styles: this.getStyles,
			component: this.constructor.name,
		};
		//* Se asignan los eventos
		this._baseEvents = {
			click: (event: Event) =>
				this.onClick.emit({ ...emitter, event, eventType: 'click' }),
			focus: (event: Event) =>
				this.onFocus.emit({ ...emitter, event, eventType: 'focus' }),
			blur: (event: Event) =>
				this.onBlur.emit({ ...emitter, event, eventType: 'blur' }),
			keydown: (event: Event) =>
				(event as KeyboardEvent).key === 'Enter' &&
				this.onKeyEnter.emit({
					...emitter,
					event,
					eventType: 'keydown.enter',
				}),
			input: (event: Event) =>
				this.onInput.emit({ ...emitter, event, eventType: 'input' }),
		};
	}

	/**
	 * ? Asigna los estilos y las clases Css al elemento html con #cnBase
	 * @protected
	 */
	protected _assignStylesAndClassesCss(): void {
		if (!!this.baseRef) {
			for (const elem of this.baseRef) {
				const baseHtml = elem.nativeElement;
				baseHtml.style.cssText = '';
				baseHtml.classList.value = this.getClasses
					.filter((classCss) => classCss !== '')
					.join(' ');
				Object.entries(this.getStyles).forEach(([property, value]) => {
					baseHtml.style.setProperty(property, value);
				});
			}
		}
	}

	/**
	 * ? Añade las propiedades comunes de todos los componentes y los añade al elemento #cnBase en el template
	 */
	protected _createBaseProperties(nativeElement: HTMLElement): void {
		const baseHtml = nativeElement;

		//* Asignamos atributos y eventos a la base de componente del elemento que sea #cnBase
		this._assignAttributes();
		this._assignEvents();

		//* Añade las clases y estilos al elemento
		this._assignStylesAndClassesCss();

		//* Añade atributos al elemento Html que tenga #cnBase
		for (const [index, attr] of Object.entries(this._baseAttributes)) {
			baseHtml.setAttribute(index, attr);
		}

		//* Añade eventos al elemento Html que tenga #cnBase
		for (const [index, attr] of Object.entries(this._baseEvents)) {
			baseHtml.addEventListener(index, attr);
		}
	}

	// !GROUP - FIN - Implementaciones
	//#endregion

	//GROUP - Utils para setters
	//#region
	/**
	 * ? Añade un método a implementar obligatoriamente por sus hijos para añadir las clases de las propiedades bindeadas
	 * @abstract
	 * @info  Usar con:
	 * @methods - protected _addClassModifiersCss(modifiers: string[]): void
	 * - protected _addClassElementsCss(elements: string[]): void
	 * - protected _addClassBlockCss(blocks: { element?: string; modifier?: string }[]): void
	 * - protected _createClassCss(element?: string, modifier?: string): string
	 * - protected _createClassesCss(blocks: { element?: string; modifier?: string }[]): string[]
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
	 * ? Crea una coleccion de clases con sus modificadores según el elemento y modificador pasado en cada elemento del bloque
	 * @protected
	 * @param {{ element?: string; modifier?: string }[]} blocks
	 * @returns {string[]}
	 */
	protected _createClassesCss(
		blocks: { element?: string; modifier?: string }[]
	): string[] {
		return blocks.map((block) =>
			this._createClassCss(block.element, block.modifier)
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

	//GROUP - Utils para los componentes
	//#region

	/**
	 * ? Muestra el log en consola
	 * @explain Util para hacer logs desde templates de angular
	 * @param arg
	 */
	public templateLog(arg: any) {
		console.log(arg);
	}
	//!GROUP - FIN - Utils para los componentes
	//#endregion
}
