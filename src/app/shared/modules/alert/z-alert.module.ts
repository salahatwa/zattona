import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZAlertComponent } from './z-alert.component';



@NgModule({
  declarations: [
    ZAlertComponent
  ],
  imports: [
    CommonModule,
  ], exports: [
    ZAlertComponent
  ]
})
export class ZAlertModule { }
