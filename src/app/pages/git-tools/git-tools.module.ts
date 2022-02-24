import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitToolsComponent } from './git-tools.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: GitToolsComponent,
    children: [

      {
        path: "",
        component: GitToolsComponent
      },
    
    ],
  },
];


@NgModule({
  declarations: [GitToolsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class GitToolsModule { }
