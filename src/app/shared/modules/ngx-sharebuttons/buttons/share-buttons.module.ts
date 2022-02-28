import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ShareButtons } from './share-buttons';
import { ExpandButton } from './expand-button';
import { ShareButtonModule } from '../button/share-button.module';
import { ShareButtonsConfig, SHARE_BUTTONS_CONFIG } from '../lib/share.models';

@NgModule({
  declarations: [
    ShareButtons,
    ExpandButton
  ],
  imports: [
    ShareButtonModule,
    CommonModule
  ],
  exports: [
    ShareButtonModule,
    ShareButtons
  ]
})
export class ShareButtonsModule {
  static withConfig(config?: ShareButtonsConfig): ModuleWithProviders<ShareButtonsModule> {
    return {
      ngModule: ShareButtonsModule,
      providers: [{provide: SHARE_BUTTONS_CONFIG, useValue: config}]
    };
  }
}
