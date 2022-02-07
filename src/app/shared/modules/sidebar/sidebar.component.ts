import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ConfigrationsService } from "src/app/core/services/api";
import { Constants } from "../../helpers/constants";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscribtion: Subscription;

  constructor(
    private configService: ConfigrationsService
  ) { }
  featuredPosts: any = [];

  defaultImage = Constants.DEFAULT_IMG;

  ngOnInit() {
    if (window['FB']) {
      window['FB'].XFBML.parse();
    }
    this.getFeaturedPosts();
  }

  ngOnDestroy() {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

  private getFeaturedPosts() {
    this.subscribtion = this.configService.data$.subscribe(
      (data) => {
        if (data?.data)
          this.featuredPosts = data.data.topViewPosts;
      }
    );
  }
}
