import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
import { SeoService } from "src/app/shared/services/seo.service";
import { LinkDTO, LinkTeamVO } from "../../../core/models/models";
import { LinkService } from "../../../core/services/api";

@Component({
  selector: "app-links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.scss"],
})
export class LinksComponent implements OnInit {

  links: LinkTeamVO;

  constructor(private linkService: LinkService,private seoService:SeoService) { }

  ngOnInit(): void {
    // this.seoService.createLinkForCanonicalURL();
    this.init();
  }

  init() {
    this.linkService.listTeamLinks().pipe(finalize(() => { })).subscribe(response => {
      this.links = response?.data;
    }, err => {

    });
  }


}
