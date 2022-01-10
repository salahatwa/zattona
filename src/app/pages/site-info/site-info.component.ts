import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";
import { SheetService } from "src/app/core/services/api";
import { Constants } from "src/app/shared/helpers/constants";
import { SeoService } from "../../shared/services/seo.service";


@Component({
  selector: "app-site-info",
  templateUrl: "./site-info.component.html",
  styleUrls: ["./site-info.component.scss"],
})
export class SiteInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private sheetService: SheetService, private seoService: SeoService) {

  }

  item: any = {};

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.ngxService.start();
        this.sheetService.getBySlug(params.slug, false, true).pipe(finalize(() => {
          this.ngxService.stop();
        })).subscribe((data) => {
          this.item = data?.data;
          this.seoService.setMetaTags({
            title: data?.data?.title + Constants.SITE_PREFIX,
            description: data?.data?.metaDescription
          });
        });
      }
    );
  }
}
