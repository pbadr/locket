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
  date: string = undefined;

  constructor(private locketService: LocketService) {
    this.locketService.setDate.subscribe(setDate => {
      this.date = setDate;
    })

  }

  ngOnInit(): void {
  }

  public inputText(): void {
    this.inputFocused = !this.inputFocused;
  }

  public onTextEnter(textValue: string): void {
    this.textValue = textValue;
  }

  public textSubmit(event: Event, textAreaInput: any): void {
    event.preventDefault();

    const textObject = {
      text: this.textValue
    }

    this.locketService.sendTextToEncrypt(textObject)
      .subscribe((response: Response | any) => {

        this.encryptedText = response.savedText
        console.log(typeof textAreaInput)
        textAreaInput.value = '';

        this.locketService.reflectChanges(this.encryptedText);
      },
        (error: Error) => console.log(error));
  }


}
