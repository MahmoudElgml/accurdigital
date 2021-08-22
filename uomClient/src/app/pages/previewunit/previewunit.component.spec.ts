import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewunitComponent } from './previewunit.component';

describe('PreviewunitComponent', () => {
  let component: PreviewunitComponent;
  let fixture: ComponentFixture<PreviewunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewunitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
