import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { SheetService } from 'src/app/core/services/api';
import { Constants } from 'src/app/shared/helpers/constants';
import { SeoService } from '../../shared/services/seo.service';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService, private sheetService: SheetService, private seoService: SeoService) {

  }

  item: any = {};

  ngOnInit(): void {
    this.ngxService.start();
    this.sheetService.getBySlug("privacy", false, true).pipe(finalize(() => {
      this.ngxService.stop();
    })).subscribe((data) => {
      this.item = data?.data;
      this.seoService.setMetaTags({
        title: `Privacy Policy ` + Constants.SITE_PREFIX,
        description: data?.data?.metaDescription
      });
    });
  }


}
