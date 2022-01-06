import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { TcListComponent } from "./tc-list/tc-list.component";

@NgModule({
  declarations: [
    TcListComponent,
    SidebarComponent,
  ],
  exports: [
    TcListComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule, LazyLoadImageModule],
})
export class SidebarModule {}
