import {
  AfterViewInit,
  Component,

  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Subscription } from "rxjs";
import { Constants } from "src/app/shared/helpers/constants";
import { SeoService } from "../../shared/services/seo.service";
import { ConfigrationsService, UserService } from "./../../core/services/api";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  defaultImage = "./assets/images/400x200.png";

  subscribtion: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private configService: ConfigrationsService,
    private meta: Meta,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private seoService: SeoService,
  ) {
    this.seoService.setMetaTags({
      title: Constants.SITE_TITLE,
      description: Constants.SITE_DESC,
    });
    this.meta.addTag({
      name: "keywords",
      content: Constants.SITE_KEYWORDS,
    });
  }
  latestPosts: any = [];
  angularPosts: any = [];
  jsPosts: any = [];
  wordpressPosts: any = [];
  devPosts: any = [];
  nodePosts: any = [];
  popularPosts: any = [];


  ngOnInit() {
    this.getLatestPosts();
  }

  ngOnDestroy() {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

  getLatestPosts() {
    this.subscribtion = this.configService.data$.subscribe(
      (data) => {
        console.log(data);
        if (data?.data)
          this.latestPosts = data.data.latestPosts;
      }
    );
  }


  addSubscribe(email) {
    this.userService.subscribe(email).subscribe((response) => {
      console.log(response);
    });
  }

  ngAfterViewInit() {

  }
}
