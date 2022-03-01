import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectionOffersComponent } from './add-collection-offers.component';

describe('AddCollectionOffersComponent', () => {
  let component: AddCollectionOffersComponent;
  let fixture: ComponentFixture<AddCollectionOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollectionOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollectionOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
