import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/shared/services/seo.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private seoService:SeoService) { }

  ngOnInit(): void {
    // this.seoService.createLinkForCanonicalURL();
  }

}
