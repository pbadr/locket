
import { Component, OnInit } from '@angular/core';

import { LocketService } from '../services/locket.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private locketService: LocketService) { }

  ngOnInit(): void {
  }

  public uploadFile(files: FileList): void {
    console.log("Uploading file..")

    if (this.isAppropriateUploadSize(files)) {
      this.locketService.uploadFile(files[0])
        .subscribe((res: Response) => console.log(res, files[0].arrayBuffer()))
    } else {
      console.log("Exceeded limit")
    }
  }

  private isAppropriateUploadSize(files: FileList): boolean {

    const fileSizeLimitBytes: number = 100000
    let filesSize: number = 0

    for (var file of Array.from(files)) {
      filesSize += file.size / 1000;
    }

    return filesSize <= fileSizeLimitBytes;

  }

}
