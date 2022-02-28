import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagsComponent } from "./tags.component";
import { TagsListingComponent } from "./tags-listing/tags-listing.component";
import { SidebarModule } from "../../shared/modules/sidebar.module";
import { RouterModule, Routes } from "@angular/router";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "src/app/shared/modules/pagination/ngx-pagination.module";

const routes: Routes = [
  {
    path: "",
    component: TagsComponent,
    children: [
      {
        path: ":slug",
        component: TagsListingComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [TagsComponent, TagsListingComponent],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule.forChild(routes),
    LazyLoadImageModule,
    NgbPaginationModule,
    NgxPaginationModule
  ],
})
export class TagsModule { }
