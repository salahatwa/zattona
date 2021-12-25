import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, switchMap } from 'rxjs/operators';
import { IpDetails } from 'src/app/core/models/models';

declare var Handlebars: any;

@Component({
  selector: 'app-get-ip-details',
  templateUrl: './get-ip-details.component.html',
  styleUrls: ['./get-ip-details.component.scss']
})
export class GetIpDetailsComponent implements OnInit {
  ipDetails: IpDetails={};

  key = 'fef1d901f1ba647a89827bc8487d1607';
  constructor(private httpClient: HttpClient, private ngxUiLoader: NgxUiLoaderService, handler: HttpBackend) {
    this.loadScript();
    this.httpClient = new HttpClient(handler);
  }

  ngOnInit(): void {
    this.loadIp();
    


   
  }

  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
}

  loadIp() {
    this.ngxUiLoader.start();
    this.httpClient.get('https://jsonip.com')
      .pipe(
        switchMap((value: any) => {
          this.ipDetails.ip = value.ip;
          let url = `http://api.ipstack.com/${value.ip}?access_key=` + this.key;
          return this.httpClient.get(url);
        })
      )
      .pipe(finalize(() => {
        this.ngxUiLoader.stop();
      })).subscribe(
        (value: any) => {
          this.ipDetails=value;
          console.log(value);


          var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
          "{{kids.length}} kids:</p>" +
          "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
var template = Handlebars.compile(source);

var data = { "name": "Alan", "hometown": "Somewhere, TX",
          "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
var result = template(data);

console.log(result);

        },
        err => {
          console.log(err);
        }
      );
  }

}
