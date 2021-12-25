import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";
import { Constants } from "src/app/shared/helpers/constants";
import { CommanService } from "src/app/shared/services/comman.service";
import { SeoService } from "src/app/shared/services/seo.service";
import { PostService } from "./../../../core/services/api";
@Component({
  selector: "app-post-listing",
  templateUrl: "./post-listing.component.html",
  styleUrls: ["./post-listing.component.scss"],
})
export class PostListingComponent implements OnInit {

  page = { id: 'post-list', itemsPerPage: Constants.PAGE_SIZE, currentPage: 0, totalItems: 0 };

  constructor(
    private postService: PostService,
    private seoService: SeoService,
    private commanService: CommanService,
    private ngxService: NgxUiLoaderService
  ) { }

  posts: any = [];
  firstPost: any;
  isLoaded: boolean = false;
  defaultImage = Constants.DEFAULT_IMG;

  ngOnInit() {
    // this.seoService.createLinkForCanonicalURL();
    this.seoService.setMetaTags({
      title: `${this.commanService.capitalizeFirstLetter("All Posts")} `+Constants.SITE_PREFIX,
    });
    this.getPage(0);
  }

  getPage(page: number) {
    this.ngxService.start();
    this.page.currentPage = page > 0 ? page - 1 : page;
    this.postService.pageBy(this.page.currentPage, this.page.itemsPerPage).pipe(finalize(() => {
      this.ngxService.stop();
    })).subscribe((response) => {
      console.log(response);
      this.posts = response.data.content;
      this.firstPost = this.posts[0];
      this.page.totalItems = response?.data?.total;
      this.page.currentPage = response?.data?.page + 1;
      window.scrollTo(0, 0);
    });
  }
}
