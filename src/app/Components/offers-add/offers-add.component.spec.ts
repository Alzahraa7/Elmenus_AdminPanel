/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OffersAddComponent } from './offers-add.component';

describe('OffersAddComponent', () => {
  let component: OffersAddComponent;
  let fixture: ComponentFixture<OffersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
