/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SideBarService } from './side-bar.service';

describe('Service: SideBar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SideBarService]
    });
  });

  it('should ...', inject([SideBarService], (service: SideBarService) => {
    expect(service).toBeTruthy();
  }));
});
