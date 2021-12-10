import { Component, OnDestroy, OnInit } from "@angular/core";
import { report } from "process";
import { Subscription } from "rxjs";
import { ConfigrationsService } from "src/app/core/services/api";
import { TagService } from "src/app/core/services/tag.service";
import { CategoryService } from "src/app/pages/categories/shared/category.service";
import { PostService } from "src/app/pages/posts/shared/post.service";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscribtion: Subscription;

  constructor(
    private configService: ConfigrationsService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private localStorageService: LocalStorageService
  ) { }
  featuredPosts: any = [];
  categories: any = [];
  tagsList: any = [];

  // defaultImage = "https://via.placeholder.com/400x200.png?text=Tutscoder";
  defaultImage = "./assets/images/400x200.png";

  ngOnInit() {
    this.getFeaturedPosts();
    this.getAllCategory();
    this.getAllTags();
  }

  ngOnDestroy() {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

  private getFeaturedPosts() {
    if (this.localStorageService.getLocalStorage("featuredData")) {
      let response = JSON.parse(
        this.localStorageService.getLocalStorage("featuredData")
      );
      if (response?.data)
        this.featuredPosts = response?.data?.topViewPosts;
    } else {
      this.subscribtion = this.configService.data$.subscribe(
        (data) => {
          if (data?.data)
            this.featuredPosts = data.data.topViewPosts;

          this.localStorageService.setLocalStorage(
            "featuredData",
            JSON.stringify(data)
          );
        }
      );

    }

  }

  private getAllCategory() {
    if (this.localStorageService.getLocalStorage("categories")) {
      this.categories = JSON.parse(
        this.localStorageService.getLocalStorage("categories")
      );
    } else {
      this.categoryService.getAllCateogry().subscribe((data) => {
        this.categories = data;
        this.localStorageService.setLocalStorage(
          "categories",
          JSON.stringify(data)
        );
      });
    }
  }

  private getAllTags() {
    if (this.localStorageService.getLocalStorage("tags")) {
      this.tagsList = JSON.parse(
        this.localStorageService.getLocalStorage("tags")
      );
    } else {
      this.tagService.listTags().subscribe((response) => {
        this.tagsList = response?.data;
        this.localStorageService.setLocalStorage(
          "tags",
          JSON.stringify(response?.data)
        );
      }, err => {
        console.log('>>' + err);
      });
    }
  }
}
