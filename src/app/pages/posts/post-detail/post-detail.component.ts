import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PostDetailVO } from "src/app/core/models/models";
import { PostService } from "src/app/core/services/post.service";
import { Constants } from "src/app/shared/helpers/constants";
import { HighlightService } from "src/app/shared/services/highlight.service";
import { SeoService } from "src/app/shared/services/seo.service";


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
  ) { }
  post: PostDetailVO;
  highlighted: boolean = false;

  hideme: any = {};
  relatedPosts: any = [];
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // defaultImage = "https://via.placeholder.com/700x400.png?text=Tutscoder";
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

      this.postService.getByUsingSlug(params["slug"], false, true).subscribe((post) => {
        this.post = post?.data;

        this.seoService.setMetaTags({
          title: `${this.post.title} ` + Constants.SITE_PREFIX,
          description: `${this.post?.metaDescription}`,
        });
        this.getRelatedPosts();
      });
    });
  }

  private getRelatedPosts() {
    // let reqData = {
    //   _id: this.post._id,
    //   categories: this.post.categories.map((value) => value._id),
    // };
    // this.postService.getRelatedPosts(reqData).subscribe((response) => {
    //   this.relatedPosts = response;

    // });
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
    console.log(email);
    let reqData = {
      email: email,
    };
    /*   this.userService.addSubscribe(reqData).subscribe((response) => {
      console.log(response);
    }); */
  }
}
