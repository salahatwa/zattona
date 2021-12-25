import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QrGeneratorComponent implements OnInit {
  sub: Subscription;
  svg: any;
  constructor(private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.sub = this.router
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.text = params['text'] || 0;
        console.log(this.text);

        if (this.text ) {

          setTimeout(function () {
            // convert to a valid XML source
            const as_text = new XMLSerializer().serializeToString(this.svg);
            // store in a Blob
            const blob = new Blob([as_text], { type: "image/svg+xml" });
            // create an URI pointing to that blob
            const url = URL.createObjectURL(blob);
            const win = open(url);
            // so the Garbage Collector can collect the blob
            win.onload = (evt) => URL.revokeObjectURL(url);
          }, 9000);



        }
      });
  }

  text = "https://github.com/werthdavid/ngx-kjua";
  render = "svg";
  crisp = true;
  minVersion = 1;
  ecLevel = "H";
  size = 400;
  ratio = undefined;
  fill = "#333333";
  back = "#ffffff";
  rounded = 0;
  quiet = 1;
  mode = "label";
  mSize = 30;
  mPosX = 50;
  mPosY = 50;
  mSize2 = 30;
  mPosX2 = 50;
  mPosY2 = 50;
  label = "kjua";
  fontname = "Ubuntu";
  fontcolor = "#ff9818";
  fontoutline = true;
  imageAsCode = false;
  imageText = "";
  imgNativeElement = undefined;
  elementId = "";

  @ViewChild("imgBuffer")
  imageElement: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => this.imgNativeElement = this.imageElement.nativeElement, 500);
  }


  /**
   * Not perfect, I know
   * @param event
   */
  getFiles(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event2: any) => { // called once readAsDataURL is completed
        this.imageElement.nativeElement.src = event2.target.result;
        this.imgNativeElement = this.imageElement.nativeElement;
      }
    }
  }

  get image() {
    if (!!this.imageText && this.imageText.length > 0) {
      return this.imageText;
    } else {
      return this.imgNativeElement;
    }
  }

  onFinish(value) {
    this.svg = value;
    console.log(value);

    // convert to a valid XML source
    // const as_text = new XMLSerializer().serializeToString(value);
    // // store in a Blob
    // const blob = new Blob([as_text], { type: "image/svg+xml" });
    // // create an URI pointing to that blob
    // const url = URL.createObjectURL(blob);
    // const win = open(url);
    // // so the Garbage Collector can collect the blob
    // win.onload = (evt) => URL.revokeObjectURL(url);
  }
}
