import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import TabComponent from "./tab.component";
import TabsComponent from "./tabs.component";

@NgModule({
  imports: [CommonModule],
  declarations: [TabsComponent, TabComponent],
  exports: [TabsComponent, TabComponent]
})
export class TabsModule { }
