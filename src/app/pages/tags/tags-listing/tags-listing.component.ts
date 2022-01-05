import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";
import { TagService } from "src/app/core/services/tag.service";
import { Constants } from "src/app/shared/helpers/constants";
import { CommanService } from "src/app/shared/services/comman.service";
import { SeoService } from "src/app/shared/services/seo.service";

@Component({
  selector: "app-tags-listing",
  templateUrl: "./tags-listing.component.html",
  styleUrls: ["./tags-listing.component.scss"],
})
export class TagsListingComponent implements OnInit {
  page = { id: 'tags-list', itemsPerPage: Constants.PAGE_SIZE, currentPage: 0, totalItems: 0 };
  defaultImage = Constants.DEFAULT_IMG;

  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private ngxService: NgxUiLoaderService,
    private seoService: SeoService,
    private commanService: CommanService
  ) { }
  posts: any;
  tag: string;
  categories: any;
  firstPost: any;
  tagsList: any = [];
  ngOnInit() {
    this.route.paramMap.subscribe(
      (pathParams) => {

        this.tag = pathParams.get("slug");

        this.seoService.setMetaTags({
          title: `${this.commanService.capitalizeFirstLetter(
            this.tag
          )} |` + Constants.SITE_PREFIX,
        });

        if (this.tag)
          this.getPage(0);

        this.getAllTags();

      }
    );
  }

  private getAllTags() {
    this.tagService.listTags().pipe(finalize(() => {

    })).subscribe((response) => {
      this.tagsList = response?.data;
    });
  }

  getPage(page: number) {
    this.ngxService.start();
    this.page.currentPage = page > 0 ? page - 1 : page;
    this.tagService.listPostsBySlug(this.tag, this.page.currentPage, this.page.itemsPerPage).pipe(finalize(() => {
      this.ngxService.stop();
    })).subscribe((response) => {
      this.posts = response?.data?.content;
      this.firstPost = this.posts[0];
      this.page.totalItems = response?.data?.total;
      this.page.currentPage = response?.data?.page + 1;
    });

  }
}
