import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { NgxPaginationModule } from "src/app/shared/modules/pagination/ngx-pagination.module";
import { SidebarModule } from "../../shared/modules/sidebar.module";
import { CategoriesComponent } from "./categories.component";
import { CategoryListingComponent } from "./category-listing/category-listing.component";


const routes: Routes = [
  {
    path: "",
    component: CategoriesComponent,
    children: [
      {
        path: ":catId",
        component: CategoryListingComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [CategoriesComponent, CategoryListingComponent],
  providers: [],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule.forChild(routes),
    LazyLoadImageModule,
    NgbPaginationModule,
    NgxPaginationModule
  ],
})
export class CategoriesModule { }
