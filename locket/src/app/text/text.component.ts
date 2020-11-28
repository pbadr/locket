import { Component, OnInit, Input } from '@angular/core';

import { LocketService } from '../services/locket.service';

import Text from '../util/type/text';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() text: Text;

  constructor(private locketService: LocketService) { }

  ngOnInit(): void {
  }

  public deleteText(textObjectId: string): void {

    this.locketService.deleteEncryption(textObjectId)
      .subscribe(data => console.log(data),
        err => console.log(err))
  }

}
