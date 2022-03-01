import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-res-details',
  templateUrl: './res-details.component.html',
  styleUrls: ['./res-details.component.css']
})
export class ResDetailsComponent implements OnInit {
  ResId:string|null;
  constructor(private actRout:ActivatedRoute) {
   this.ResId= actRout.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

}
