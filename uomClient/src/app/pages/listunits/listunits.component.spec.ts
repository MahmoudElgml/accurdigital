import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListunitsComponent } from './listunits.component';

describe('ListunitsComponent', () => {
  let component: ListunitsComponent;
  let fixture: ComponentFixture<ListunitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListunitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
