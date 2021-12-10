import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs/operators";
import { LinkDTO, LinkTeamVO } from "./../../../core/models/models";
import { LinkService } from "./../../../core/services/api";

@Component({
  selector: "app-tools",
  templateUrl: "./tools.component.html",
  styleUrls: ["./tools.component.scss"],
})
export class ToolsComponent implements OnInit {

  links: LinkTeamVO;

  constructor(private linkService: LinkService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.linkService.listTeamLinks().pipe(finalize(() => { })).subscribe(response => {
      this.links = response?.data;
    }, err => {

    });
  }


}
