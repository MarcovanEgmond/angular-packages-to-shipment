import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageoverviewComponent } from './packageoverview.component';

describe('PackageoverviewComponent', () => {
  let component: PackageoverviewComponent;
  let fixture: ComponentFixture<PackageoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  

  it(`should have as resulttitle 'Package overview'`, () => {
    const fixture = TestBed.createComponent(PackageoverviewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.resulttitle).toEqual('Package overview');
  });

  it('should render resulttitle in a h3 tag', () => {
    const fixture = TestBed.createComponent(PackageoverviewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Package overview');
  });
});
