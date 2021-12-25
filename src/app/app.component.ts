import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from "rxjs/operators";
import { ConfigrationsService } from "./core/services/api";
import { SeoService } from "./shared/services/seo.service";
import { SessionStorageService } from "./shared/services/session-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {


  constructor(@Inject(DOCUMENT) private document: any, private seoService: SeoService, private router: Router, private configService: ConfigrationsService, private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.updateCanonical();
    this.init();
  }

  private updateCanonical() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {
        this.seoService.createLinkForCanonicalURL(this.document.location.origin + this.router.url);
      })
  }

  title = "nodeblog";


  private init() {
    if (this.sessionStorageService.getSessionStorage("latestPosts")) {
      let result = JSON.parse(
        this.sessionStorageService.getSessionStorage("latestPosts")
      );
      console.log(result);
      this.configService.sendData(result);

    } else {

      this.configService.init().subscribe((data) => {
        console.log(data);
        this.configService.sendData(data);
        this.sessionStorageService.setSessionStorage(
          "latestPosts",
          JSON.stringify(data)
        );
      });
    }
  }

}
