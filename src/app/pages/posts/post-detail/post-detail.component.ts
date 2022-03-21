import { Clipboard } from '@angular/cdk/clipboard';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";
import { UserService } from "src/app/core/services/api";
import { PostService } from "src/app/core/services/post.service";
import { Constants } from "src/app/shared/helpers/constants";
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
    private seoService: SeoService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private clipboard: Clipboard
  ) {

  }
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
    if (this.post?.formatContent) {
      this.updateToc();
      this.updateTable();
      this.addCopyBtn();
    }

    this.route.fragment.subscribe((fragment: string) => {
      if (fragment && document.getElementById(fragment) != null) {
        document.getElementById(fragment).scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /**
   * Update table of content add fragment attr
   * Update href
   */
  updateToc() {
    this.elRef.nativeElement.querySelectorAll('a').forEach(element => {
      let oldLink = element.getAttribute('href');
      if (oldLink.startsWith('#')) {
        let fragment = oldLink.substring(1, oldLink.length);
        element.setAttribute("fragment", fragment);
        let path = "/post/" + this.route.snapshot.url.join('/') + oldLink;
        element.setAttribute("href", path);
      }
    });
  }


  /**
   * Update table adding class to table tag
   */
   updateTable() {
    this.elRef.nativeElement.querySelectorAll('table').forEach(element => {
      this.renderer.addClass(element, 'table');
      this.renderer.addClass(element, 'table-bordered');
      this.renderer.addClass(element, 'table-hover');    
    });

    this.elRef.nativeElement.querySelectorAll('thead').forEach(element => {
      this.renderer.addClass(element, 'thead-light');   
    });
  }

  addCopyBtn() {
    this.elRef.nativeElement.querySelectorAll('pre').forEach(element => {
      const button = this.renderer.createElement('button');
      this.renderer.addClass(button, 'copy-btn');
      this.renderer.listen(button, 'click', (event) => {
        this.clipboard.copy(element?.querySelector('code').innerText);
      });
      const text = this.renderer.createText('Copy');
      const div = this.renderer.createElement('div');
      this.renderer.setStyle(div, 'position', 'absolute');
      this.renderer.setStyle(div, 'right', '0');
      this.renderer.setStyle(div, 'float', 'right');
      this.renderer.appendChild(div, button);
      this.renderer.appendChild(button, text);
      this.renderer.appendChild(element, div);
      this.renderer.insertBefore(element, div, element?.querySelector('code'));
    });
  }



  ngOnInit() {
    this.route.params.subscribe((params) => {

      this.ngxService.start();
      this.postService.getByUsingSlug(params["slug"], false, false).pipe(finalize(() => {
        this.ngxService.stop();
      })).subscribe((post) => {
        this.post = post?.data;
        this.defaultImage = this.post?.thumbnail ? this.post?.thumbnail : this.defaultImage;
        this.seoService.setMetaTags({
          title: `${this.post.title} ` + Constants.SITE_PREFIX,
          description: `${this.post?.metaDescription}`,
          image: `${this.post?.thumbnail}`,
          keywords: `${this.post?.metaKeywords}`,
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
