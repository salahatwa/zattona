import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";
import { SheetService } from "src/app/core/services/api";
import { Constants } from "src/app/shared/helpers/constants";
import { SeoService } from "../../shared/services/seo.service";


@Component({
  selector: "app-terms",
  templateUrl: "./terms.component.html",
  styleUrls: ["./terms.component.scss"],
})
export class TermsComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService, private sheetService: SheetService, private seoService: SeoService) {
   
  }

  item: any = {};

  ngOnInit(): void {
    // this.seoService.createLinkForCanonicalURL();
    this.ngxService.start();
    this.sheetService.getBySlug("terms", false, true).pipe(finalize(() => {
      this.ngxService.stop();
    })).subscribe((data) => {
      this.item = data?.data;
      this.seoService.setMetaTags({
        title: `Terms & Conditions ` + Constants.SITE_PREFIX,
        description: data?.data?.metaDescription
      });
    });
  }
}
