import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiformComponent } from './uiform.component';

describe('UiformComponent', () => {
  let component: UiformComponent;
  let fixture: ComponentFixture<UiformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
