import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { ConfigrationsService } from "./core/services/api";
import { CategoryService } from "./pages/categories/shared/category.service";
import { SessionStorageService } from "./shared/services/session-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {


  constructor(public router: Router, private configService: ConfigrationsService, private sessionStorageService: SessionStorageService) { }

  ngOnInit() {

    this.init();

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
