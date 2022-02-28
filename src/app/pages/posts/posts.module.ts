import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from "src/app/shared/modules/pagination/ngx-pagination.module";
import { SharedPostModule } from "../../shared/modules/shared-post.module";
import { SidebarModule } from "../../shared/modules/sidebar.module";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostListingComponent } from "./post-listing/post-listing.component";
import { PostsComponent } from "./posts.component";
import { PostService } from "./shared/post.service";




const routes: Routes = [
  {
    path: "",
    component: PostsComponent,
    children: [
      {
        path: "",
        component: PostListingComponent,
      },
      {
        path: ":slug",
        component: PostDetailComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [PostsComponent, PostListingComponent, PostDetailComponent],
  providers: [PostService],
  imports: [
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    SharedPostModule,
    SidebarModule,
    RouterModule.forChild(routes),
    NgbPaginationModule,
    NgxPaginationModule
  ],
})
export class PostsModule { }
