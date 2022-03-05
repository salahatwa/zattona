import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { SanitizeHtmlPipe } from "../pipes/sanitizehtml.pipe";
import { TwoColPostComponent } from "./two-col-post/two-col-post.component";
import { VerticlePostCardComponent } from "./verticle-post-card/verticle-post-card.component";

@NgModule({
  declarations: [
    VerticlePostCardComponent,
    TwoColPostComponent,
    SanitizeHtmlPipe
  ],
  exports: [VerticlePostCardComponent, TwoColPostComponent,SanitizeHtmlPipe],
  imports: [CommonModule, RouterModule, LazyLoadImageModule],
})
export class SharedPostModule {}
