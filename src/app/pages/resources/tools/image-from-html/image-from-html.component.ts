import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';

declare var Handlebars: any;
declare var html2pdf: any;


export interface ImgTmp {
  source?: string;
  data?: string;
}

@Component({
  selector: 'app-image-from-html',
  templateUrl: './image-from-html.component.html',
  styleUrls: ['./image-from-html.component.scss']
})
export class ImageFromHtmlComponent implements OnInit {

  imgTmp: ImgTmp = {
    source: "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
      "{{kids.length}} kids:</p>" +
      "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>",

    data: '{"name": "Alan", "hometown": "Somewhere, TX","kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]}'
  }

  result: string = "";

  constructor(private httpClient: HttpClient, private ngxUiLoader: NgxUiLoaderService, handler: HttpBackend) {
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js');
    this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
    this.httpClient = new HttpClient(handler);
  }

  ngOnInit(): void {
    this.ngxUiLoader.start();
    this.httpClient.get('https://jsonip.com').pipe(finalize(() => {
      this.ngxUiLoader.stop();
    })).subscribe(result => {
      console.log(result);
      this.render();
    });
  }

  private loadScript(url: string) {
    // let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  render() {
    var template = Handlebars.compile(this.imgTmp?.source);
    this.result = template(JSON.parse(this.imgTmp?.data));
  }

  generateImage() {
    // var element: any = document.getElementById('image-section');
    // this.ngxUiLoader.start();
    var element = document.getElementById('image-section'); 
   
    var opt = { margin: 0, filename: 'result.pdf', image: { type: 'jpeg', quality: 1 },
     html2canvas: { dpi: 95, scale: 5, letterRendering: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
      // var totalPages = pdf.internal.getNumberOfPages();
      // let i: number = 0;
      // for (i = 1; i <= totalPages; i++) {
      //   pdf.setPage(i);

      //   this.pageHeight = pdf.internal.pageSize.getHeight();
      // }
    }).save();
    // .finally(
    //     ()=>{
    //       this.ngxUiLoader.stop();
    //     }
    //   );

    // 
    // htmlToImage.toPng(node).finally(
    //   ()=>{
    //     this.ngxUiLoader.stop();
    //   }
    // )
    //   .then(function (dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     img.crossOrigin = "Anonymous";

    //     var a = document.createElement('a');
    //     a.href = dataUrl;
    //     a.download = "result.png";
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });
  }
}
