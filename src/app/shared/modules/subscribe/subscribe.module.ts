import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ZAlertModule } from '../alert/z-alert.module';
import { SubscribeComponent } from './subscribe.component';



@NgModule({
  declarations: [
    SubscribeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    ZAlertModule,
  ],
  exports: [
    SubscribeComponent
  ]
})
export class SubscribeModule { }
