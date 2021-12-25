import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";
import { UserService } from "src/app/core/services/api";
import { PostService } from "src/app/core/services/post.service";
import { Constants } from "src/app/shared/helpers/constants";
import { HighlightService } from "src/app/shared/services/highlight.service";
import { SeoService } from "src/app/shared/services/seo.service";
import { PostDetailVO } from "./../../../core/models/models";


@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit, AfterViewChecked {
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private highlightService: HighlightService,
    private seoService: SeoService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService
  ) { }
  post: PostDetailVO;
  highlighted: boolean = false;

  hideme: any = {};
  relatedPosts: any = [];
  emailPattern = Constants.EMAIL_PATTERN;
  defaultImage = Constants.DEFAULT_IMG;
  /**
   * Highlight blog post when it's ready
   */
  ngAfterViewChecked() {
    if (this.post?.formatContent && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {

      this.ngxService.start();
      this.postService.getByUsingSlug(params["slug"], false, true).pipe(finalize(() => {
        this.ngxService.stop();
      })).subscribe((post) => {
        this.post = post?.data;

        this.seoService.setMetaTags({
          title: `${this.post.title} ` + Constants.SITE_PREFIX,
          description: `${this.post?.metaDescription}`,
          image: `${this.post?.thumbnail}`,
        });
      });
    });
  }



  commentData: any = {};
  replyData: any = {};
  subscriberEmail: any = {};
  addComment(commentForm: NgForm, data) {
    // if (commentForm.invalid) {
    //   return;
    // }

    // this.postService.addComment(this.post._id, data).subscribe((response) => {
    //   alert("Comment added");
    // });
  }
  replyComment(replyForm: NgForm, data, commentId) {
    // if (replyForm.invalid) {
    //   return;
    // }
    // let reqData = JSON.parse(JSON.stringify(data));

    // reqData.commentId = commentId;

    // this.postService
    //   .replyComment(this.post._id, reqData)
    //   .subscribe((response) => {
    //     alert("Comment added");
    //   });
  }
  emailError: any = "";
  addSubscribe(form: NgForm, email) {
    if (form.invalid) {
      return;
    }

    this.userService.subscribe(email).subscribe((response) => {
      console.log(response);
    });
  }
}
