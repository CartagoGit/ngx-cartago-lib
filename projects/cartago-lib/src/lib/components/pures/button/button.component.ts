import { Component, OnInit } from '@angular/core';
import { LibraryConfig } from '../../../../config/config.model';

@Component({
  selector: 'cn-component-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const prueba = new LibraryConfig();
    // console.log(prueba);
  }
}
