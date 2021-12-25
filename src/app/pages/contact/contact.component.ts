import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SeoService } from "src/app/shared/services/seo.service";
import { UserService } from "./../../core/services/api";


@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  contact: any = {};

  constructor(private userService: UserService,private seoService:SeoService) {}

  ngOnInit(): void {
    // this.seoService.createLinkForCanonicalURL();
  }

  contactUs(contactForm: NgForm, data) {
    if (contactForm.invalid) {
      return;
    }

    this.userService.contactUs(this.contact).subscribe((response) => {
      console.log(response);
    });
  }
}
