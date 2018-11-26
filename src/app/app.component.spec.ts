import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainheaderComponent } from './mainheader/mainheader.component';
import { PackageformComponent } from './packageform/packageform.component';
import { PackageoverviewComponent } from './packageoverview/packageoverview.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent,
        MainheaderComponent,
        PackageformComponent,
        PackageoverviewComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Add packages to the shipmentt'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Add packages to the shipment');
  });

  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Add packages to the shipment');
  });

  it(`should have as description 'In order to complete your shipment, you must add at least one package. The maximum number of packages per shipment is five.'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.description).toEqual('In order to complete your shipment, you must add at least one package. The maximum number of packages per shipment is five.');
  });

  it('should render description in a p tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('In order to complete your shipment, you must add at least one package. The maximum number of packages per shipment is five.');
  });
});
