import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ShareButtonsConfig, SHARE_BUTTONS_CONFIG } from '../lib/share.models';
import { ShareModule } from '../lib/share.module';
import { ShareButton } from './share-button';

@NgModule({
  declarations: [
    ShareButton
  ],
  imports: [
    ShareModule,
    CommonModule
  ],
  exports: [
    ShareModule,
    ShareButton
  ]
})
export class ShareButtonModule {
  static withConfig(config?: ShareButtonsConfig): ModuleWithProviders<ShareButtonModule> {
    return {
      ngModule: ShareButtonModule,
      providers: [{provide: SHARE_BUTTONS_CONFIG, useValue: config}]
    };
  }
}
