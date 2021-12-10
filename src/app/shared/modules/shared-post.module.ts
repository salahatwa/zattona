import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PostCardComponent } from "./post-card/post-card.component";
import { VerticlePostCardComponent } from "./verticle-post-card/verticle-post-card.component";
import { TwoColPostComponent } from "./two-col-post/two-col-post.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { PostImgComponent } from "./post-img/post-img.component";

@NgModule({
  declarations: [
    PostCardComponent,
    PostImgComponent,
    VerticlePostCardComponent,
    TwoColPostComponent,
  ],
  exports: [PostCardComponent,PostImgComponent, VerticlePostCardComponent, TwoColPostComponent],
  imports: [CommonModule, RouterModule, LazyLoadImageModule],
})
export class SharedPostModule {}
