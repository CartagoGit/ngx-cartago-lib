import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../../models/components/base/base-component.model';

@Component({
	selector: 'cn-component-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent extends BaseComponent {
	// ANCHOR - Variables

	/**
	 * ? Tamaños predefinidos del botón
	 * @type {('small' | 'medium' | 'large')}
	 */
	@Input() size: 'small' | 'medium' | 'large' = 'medium';

	// ANCHOR - Constructor
	constructor() {
		super();
	}
	public override onInit(): void {

	}

	//ANCHOR - Métodos
	protected _addClasses(): void {
		this._addClassModifiersCss([this.size]);
	}
}
