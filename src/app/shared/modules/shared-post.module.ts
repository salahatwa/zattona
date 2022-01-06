import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { TwoColPostComponent } from "./two-col-post/two-col-post.component";
import { VerticlePostCardComponent } from "./verticle-post-card/verticle-post-card.component";

@NgModule({
  declarations: [
    VerticlePostCardComponent,
    TwoColPostComponent,
  ],
  exports: [VerticlePostCardComponent, TwoColPostComponent],
  imports: [CommonModule, RouterModule, LazyLoadImageModule],
})
export class SharedPostModule {}
