import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { SheetService } from 'src/app/core/services/api';
import { Constants } from 'src/app/shared/helpers/constants';
import { SeoService } from '../../shared/services/seo.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService, private sheetService: SheetService, private seoService: SeoService) {

    this.seoService.setMetaTags({
      title: `About us ` + Constants.SITE_PREFIX,
      description: Constants.SITE_DESC,
    });

  }
  item: any = {};
  ngOnInit(): void {
    this.ngxService.start();
    this.sheetService.getBySlug("about", false, true).pipe(finalize(() => {
      this.ngxService.stop();
    })).subscribe((data) => {
      this.item = data?.data;
    });
  }
}
