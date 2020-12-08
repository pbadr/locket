import { Component, OnInit } from '@angular/core';

import { LocketService } from '../services/locket.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  dateForm: FormGroup;

  constructor(private locketService: LocketService) {
    this.dateForm = new FormGroup({
      "currentDate": new FormControl(new Date().toISOString().substring(0, 10))
    })
  }

  ngOnInit(): void {
  }

  public onDateSet(): void {
    this.locketService.setDateValue(this.dateForm.value);
  }

}
