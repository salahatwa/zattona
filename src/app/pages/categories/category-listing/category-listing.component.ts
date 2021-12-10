import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { combineLatest } from "rxjs/internal/observable/combineLatest";
import { finalize } from "rxjs/operators";
import { CategoryService } from "src/app/core/services/api";
import { CommanService } from "src/app/shared/services/comman.service";
import { SeoService } from "src/app/shared/services/seo.service";
import { Constants } from "./../../../shared/helpers/constants";

@Component({
  selector: "app-category-listing",
  templateUrl: "./category-listing.component.html",
  styleUrls: ["./category-listing.component.scss"],
})
export class CategoryListingComponent implements OnInit {

  page = { id: 'category-list', itemsPerPage: Constants.PAGE_SIZE, currentPage: 0, totalItems: 0 };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private seoService: SeoService,
    private commanService: CommanService,
    private ngxService: NgxUiLoaderService
  ) { }
  posts: any[];
  category: string;
  firstPost: any;
  defaultImage = Constants.DEFAULT_IMG;

  ngOnInit() {
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(
      ([pathParams]) => {

        this.category = pathParams.get("catId");

        this.seoService.setMetaTags({
          title: `${this.commanService.capitalizeFirstLetter(
            this.category
          )} `+Constants.SITE_PREFIX,
        });

        this.getPage(0);
      }
    );
  }




  getPage(page: number) {
    this.ngxService.start();
    this.page.currentPage = page > 0 ? page - 1 : page;
    this.categoryService.listPostsBy(this.category, this.page.currentPage, this.page.itemsPerPage).pipe(finalize(() => {
      this.ngxService.stop();
    })).subscribe((response) => {
      this.posts = response?.data?.content;
      this.firstPost = this.posts[0];
      this.page.totalItems = response?.data?.total;
      this.page.currentPage = response?.data?.page + 1;
    });
  }

}
