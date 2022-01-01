import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, switchMap } from 'rxjs/operators';
import { IpDetails } from 'src/app/core/models/models';



@Component({
  selector: 'app-get-ip-details',
  templateUrl: './get-ip-details.component.html',
  styleUrls: ['./get-ip-details.component.scss']
})
export class GetIpDetailsComponent implements OnInit {
  ipDetails: IpDetails = {};

  key = 'fef1d901f1ba647a89827bc8487d1607';
  constructor(private httpClient: HttpClient, private ngxUiLoader: NgxUiLoaderService, handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  ngOnInit(): void {
    this.loadIp();
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
          this.ipDetails = value;
          console.log(value);
        },
        err => {
          console.log(err);
        }
      );
  }

}
