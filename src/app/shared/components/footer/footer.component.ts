import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ConfigrationsService } from "src/app/core/services/api";

import { PostService } from "../../../pages/posts/shared/post.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit,OnDestroy {
  subscribtion: Subscription;
  constructor(
    private userService: UserService,
    private configService: ConfigrationsService,
    private localStorageService: LocalStorageService
  ) {}
  featuredPosts: any = [];
  ngOnInit(): void {
    this.getFeaturedPosts();
  }
  ngOnDestroy() {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

  error:any = '';
  success:any = '';
  addSubscribe(email) {
    let reqData = {
      email: email,
    };
    this.userService.addSubscribe(reqData).subscribe((response) => {
      
      this.error = '';
      this.success='Verfication mail sent,please verify...'
    },err=>{
      
      if(err.error.error.code===11000){
        this.error='Email adresss already exists!'
      }
    });
  }

  private getFeaturedPosts() {
    if (this.localStorageService.getLocalStorage("featuredData")) {
      let response = JSON.parse(
        this.localStorageService.getLocalStorage("featuredData")
      );
      if (response?.data)
        this.featuredPosts = response?.data?.topViewPosts;
    } else {
      this.subscribtion = this.configService.data$.subscribe(
        (data) => {
          if (data?.data)
            this.featuredPosts = data.data.topViewPosts;

          this.localStorageService.setLocalStorage(
            "featuredData",
            JSON.stringify(data)
          );
        }
      );

    }

  }
}
