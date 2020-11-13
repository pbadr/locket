import { Component, OnInit } from '@angular/core';

import { LocketService } from '../services/locket.service';

@Component({
  selector: 'app-locket',
  templateUrl: './locket.component.html',
  styleUrls: ['./locket.component.scss']
})
export class LocketComponent implements OnInit {

  constructor(private locketService: LocketService) { }

  ngOnInit(): void {
  }

  addLocket(): void {
    console.log("Adding locket..");
    this.locketService.communicate()
      .subscribe((data) => console.log(data))
  }

}
