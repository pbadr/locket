import { Component, OnInit, Input } from '@angular/core';

import Text from '../util/type/text';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() text: Text;

  constructor() { }

  ngOnInit(): void {
  }

}
