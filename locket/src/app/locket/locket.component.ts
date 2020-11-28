import { Component, OnInit } from '@angular/core';

import Text from '../util/type/text';

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
  encryptedText: Text;
  inputFocused: boolean = false;

  constructor(private locketService: LocketService) { }

  ngOnInit(): void {
  }

  public inputText(): void {
    this.inputFocused = !this.inputFocused;
    console.log(this.inputFocused);
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

        this.encryptedText = response.savedText

        this.locketService.reflectChanges(this.encryptedText);
      },
        (error: Error) => console.log(error));
  }


}
