import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-tc-list",
  templateUrl: "./tc-list.component.html",
  styleUrls: ["./tc-list.component.scss"],
})
export class TcListComponent implements OnInit {
  constructor() {}

  @Input() link:string;
  @Input("list") set list(data) {
    this.results = data;
  }

  results: any;

  ngOnInit(): void {}
}
