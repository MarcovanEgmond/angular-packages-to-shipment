import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentformComponent } from './shipmentform.component';

describe('ShipmentformComponent', () => {
  let component: ShipmentformComponent;
  let fixture: ComponentFixture<ShipmentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
