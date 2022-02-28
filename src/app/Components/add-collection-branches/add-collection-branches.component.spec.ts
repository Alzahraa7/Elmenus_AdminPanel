import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectionBranchesComponent } from './add-collection-branches.component';

describe('AddCollectionBranchesComponent', () => {
  let component: AddCollectionBranchesComponent;
  let fixture: ComponentFixture<AddCollectionBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollectionBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollectionBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
