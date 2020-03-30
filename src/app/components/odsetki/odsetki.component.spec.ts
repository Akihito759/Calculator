import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsetkiComponent } from './odsetki.component';

describe('OdsetkiComponent', () => {
  let component: OdsetkiComponent;
  let fixture: ComponentFixture<OdsetkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdsetkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsetkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
