/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminsAddComponent } from './admins-add.component';

describe('AdminsAddComponent', () => {
  let component: AdminsAddComponent;
  let fixture: ComponentFixture<AdminsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
