import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
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
    this.route.paramMap.subscribe(
      (pathParams) => {

        this.category = pathParams.get("catId");

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

      this.seoService.setMetaTags({
        title: `${this.commanService.capitalizeFirstLetter(
          response?.data?.category?.name
        )} ` + Constants.SITE_PREFIX,
        description: response?.data?.category?.description,
        image: response?.data?.category?.thumbnail,
      });

      this.posts = response?.data?.posts?.content;
      this.firstPost = this.posts[0];
      this.page.totalItems = response?.data?.posts?.total;
      this.page.currentPage = response?.data?.posts?.page + 1;
    });
  }

}
