import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit
} from "@angular/core";

import TabComponent from "./tab.component";

@Component({
  selector: "ngx-tabs",
  template: `
    <div class="tabs-container">
      <ul class="nav nav-tabs">
        <li *ngFor="let tab of tabs" class="tab post-category mr-2" [ngClass]="{'active': tab.active === true }" (click)="selectTab(tab)">{{ tab.tabTitle }} </li>
      </ul>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .tabs-container {
        height: inherit;
        margin:2px;
      }
      .tabs-container .tab{
        text-align:center;
        width:inherit;
        cursor: pointer;

      }
      .tabs-container .tab:hover{
         
         border-radius:2px;
           opacity:90%;
      }
       .tabs-container .tab.active{
         background-color:#374957;
         }
    `
  ]
})
export default class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  constructor() {
    console.log(this.tabs);
  }
  ngAfterContentInit() {
    console.log(this.tabs);
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    if (tab) {
      this.tabs.toArray().forEach(tab => (tab.active = false));
      tab.active = true;
    }
  }
}
