import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,

  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
// import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Subscription } from "rxjs";
import { Constants } from "src/app/shared/helpers/constants";
import { SeoService } from "../../shared/services/seo.service";
import { SessionStorageService } from "../../shared/services/session-storage.service";
import { UserService } from "../../shared/services/user.service";
import { CategoryService } from "../categories/shared/category.service";
import { ConfigrationsService, PostService } from "./../../core/services/api";

declare const $: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {


  // defaultImage = "https://via.placeholder.com/400x200.png?text=Tutscoder";
  defaultImage = "./assets/images/400x200.png";

  subscribtion: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private configService: ConfigrationsService,
    private categoryService: CategoryService,
    private meta: Meta,
    private title: Title,
    private userService: UserService,
    // private modalService: BsModalService,
    private ngxService: NgxUiLoaderService,
    private seoService: SeoService,
    private sessionStorageService: SessionStorageService
  ) {
    this.seoService.setMetaTags({
      title: `GenHub - Programming Blog & Web Development Tutorials`,
      description: `Learn Web Development, NodeJs, Angular, JavaScript, jQuery ,Ajax,ReactJs, WordPress with GenHub tutorials`,
    });
    this.meta.addTag({
      name: "keywords",
      content: `Web Development, NodeJs, Angular, JavaScript, jQuery ,Ajax,ReactJs, WordPress, tutorials`,
    });
  }
  latestPosts: any = [];
  angularPosts: any = [];
  jsPosts: any = [];
  wordpressPosts: any = [];
  devPosts: any = [];
  nodePosts: any = [];
  popularPosts: any = [];

  // @ViewChild("subscriberModal") elementView: ElementRef;

  ngOnInit() {
    this.getLatestPosts();
    // this.getPostByCategory("angular");
    // this.getPostByCategory("nodejs");
    // this.getPostByCategory("javascript");
    // this.getPostByCategory("wordpress");
    // this.getPostByCategory("web-development");
  }
  ngOnDestroy() {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

  getLatestPosts() {
    this.subscribtion = this.configService.data$.subscribe(
      (data) => {
        console.log(data);
        if(data?.data)
        this.latestPosts = data.data.latestPosts;
      }
    );
  }

  private getPostByCategory(category) {
    let reqData = {
      limit: 5,
      category: category,
    };

    this.categoryService.getPostByCateogry(reqData).subscribe((response) => {
      if (category == "angular") {
        this.angularPosts = response["data"];
      }
      if (category == "nodejs") {
        this.nodePosts = response["data"];
      }
      if (category == "javascript") {
        this.jsPosts = response["data"];
      }
      if (category == "wordpress") {
        this.wordpressPosts = response["data"];
      }
      if (category == "web-development") {
        this.devPosts = response["data"];
      }
    });
  }

  addSubscribe(email) {
    let reqData = {
      email: email,
    };
    this.userService.addSubscribe(reqData).subscribe((response) => {
      console.log(response);
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platform)) {
      $(".nav.navbar-nav li a").on("click", function () {
        $(this).parent("li").find(".dropdown-menu").slideToggle();
        $(this).find("li i").toggleClass("fa-angle-down fa-angle-up");
      });

      /* ----------------------------------------------------------- */
      /*  Site search
  /* ----------------------------------------------------------- */

      $("#search").on("click", function () {
        $(".site-search").addClass("visible");
        $("#searchInput").focus();
      });
      $(".search-close").on("click", function () {
        $(".site-search").removeClass("visible");
      });

      /* ----------------------------------------------------------- */
      /*  Scroll To Top
  /* ----------------------------------------------------------- */
      $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
          $(".scroll-to-top").fadeIn();
        } else {
          $(".scroll-to-top").fadeOut();
        }
      });

      // scroll body to 0px on click
      $(".scroll-to-top").on("click", function () {
        $("body,html").animate(
          {
            scrollTop: 0,
          },
          500
        );
        return false;
      });
    }
  }
}
