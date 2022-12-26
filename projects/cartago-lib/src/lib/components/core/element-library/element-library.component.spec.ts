import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementLibraryComponent } from './element-library.component';

describe('ElementLibraryComponent', () => {
  let component: ElementLibraryComponent;
  let fixture: ComponentFixture<ElementLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
