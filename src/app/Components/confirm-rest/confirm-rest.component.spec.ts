import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRestComponent } from './confirm-rest.component';

describe('ConfirmRestComponent', () => {
  let component: ConfirmRestComponent;
  let fixture: ComponentFixture<ConfirmRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
