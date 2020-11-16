import { Component, OnInit } from '@angular/core';

import { LocketService } from '../services/locket.service';

@Component({
  selector: 'app-locket',
  templateUrl: './locket.component.html',
  styleUrls: [
    './locket.component.scss',
    '../util/css/button.scss',
    '../util/css/text-input.scss']
})
export class LocketComponent implements OnInit {

  textValue: string = '';
  encryptedTextObject: object;

  constructor(private locketService: LocketService) { }

  ngOnInit(): void {
  }

  public onTextEnter(textValue: string): void {
    this.textValue = textValue
    console.log(this.textValue)
  }

  public textSubmit(event: Event): void {
    event.preventDefault();

    const textObject = {
      text: this.textValue
    }

    this.locketService.sendTextToEncrypt(textObject)
      .subscribe((response: Response | any) => {
        console.log(response);
        this.encryptedTextObject = {
          text: response.encryptedText,
          bytes: response.bytes
        }
      },
        (error: Error) => console.log(error))
  }

}
