import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PackageformComponent } from './packageform.component';

describe('PackageformComponent', () => {
  let component: PackageformComponent;
  let fixture: ComponentFixture<PackageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ PackageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(`should have as formtitle 'Add package'`, () => {
    const fixture = TestBed.createComponent(PackageformComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.formtitle).toEqual('Add package');
  });

  it('should render formtitle in a h3 tag', () => {
    const fixture = TestBed.createComponent(PackageformComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Add package');
  });
});
