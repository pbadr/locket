
import { Component, OnInit } from '@angular/core';
import { LocketService } from '../services/locket.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss', '../util/css/button.scss']
})
export class UploadComponent implements OnInit {

  filesUploaded: boolean = false;
  file: File;
  filesList: File[] = [];

  constructor(private locketService: LocketService) { }

  ngOnInit(): void { }

  public removeFile(file: File): void {
    this.filesList = this.filesList.filter(fileItem => fileItem !== file)
  }

  public uploadFile(files: FileList): void {
    console.log("Processing files...")

    if (this.isAppropriateUploadSize(files)) {

      if (files.length < 2)
        this.file = files[0];

      else {
        Array.from(files).forEach(file => {
          this.filesList.push(file);
        })
      }

      this.filesUploaded = true;

    } else {
      console.log("Exceeded limit")
    }
  }

  // SENDING FILES

  public sendFiles(event: Event): void {

    event.preventDefault();

    const formData = new FormData();

    if (this.filesList.length < 2) {

      console.log("Uploading single file...");
      formData.append('file', this.file)

      this.locketService.uploadFile(formData, false)
        .subscribe(
          (res: Response) => console.log(res),
          (err: Error) => console.log(err)
        );

    } else {

      console.log("Uploading multiple files...");

      this.filesList.forEach((file) => {
        formData.append('files', file);
      })

      this.locketService.uploadFile(formData, true)
        .subscribe(
          (res: Response) => console.log(res),
          (err: Error) => console.log(err)
        );
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
