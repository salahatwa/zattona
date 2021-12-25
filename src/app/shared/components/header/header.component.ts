import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MenuTeamVO } from "src/app/core/models/models";
import { ConfigrationsService } from "../../../core/services/api";

export class Menu {
  id?: string;
  name?: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscribtion: Subscription;

  menus: MenuTeamVO[] = [];
  isMenuOpened: boolean = false;

  customMenus: MenuTeamVO[] = [
    {
      team: "Resources",
      menus: [
        {
          name: "Tools",
          icon: "fa fa-code",
          url: "/resources/tools",
          team: "Resources"
        },
        {
          name: "Links",
          icon: "fa fa-address-book",
          url: "/resources/links",
          team: "Resources"
        }
      ]
    }
  ];

  iconClicked(id) {
    let menuIcon: HTMLElement = document.getElementById(id) as HTMLElement;
    if (menuIcon?.classList?.contains('open'))
      menuIcon.classList.remove('open');
    else
      menuIcon.classList.add('open');
  }

  constructor(
    private configService: ConfigrationsService
  ) { }


  ngOnInit() {
    this.getMenues();
  }

  ngOnDestroy() {
    if (this.subscribtion)
      this.subscribtion.unsubscribe();
  }

  getMenues() {
    this.subscribtion = this.configService.data$.subscribe(
      (data) => {
        console.log(data);
        if (data?.data)
          this.menus = data.data.menuTeams;
      }
    );
  }

}
