import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacePipe } from './replacepipe.pipe';

describe('RegexpipeComponent', () => {
  let component: ReplacePipe;
  let fixture: ComponentFixture<ReplacePipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacePipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
