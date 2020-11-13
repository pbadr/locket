import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locket',
  templateUrl: './locket.component.html',
  styleUrls: ['./locket.component.scss']
})
export class LocketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addLocket(): void {
    console.log("Adding locket..");
  }

}
