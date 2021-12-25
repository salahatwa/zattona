import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgxKjuaModule } from "src/app/shared/modules/ngx-kjua/ngx-kjua.module";
import { TabsModule } from "src/app/shared/modules/tab/tabs.module";
import { BooksComponent } from "./books/books.component";
import { CoursesComponent } from "./courses/courses.component";
import { LinksComponent } from "./links/links.component";
import { ResourcesComponent } from "./resources.component";
import { CodeGeneratorComponent } from "./tools/code-generator/code-generator.component";
import { QrGeneratorComponent } from './tools/qr-code-generator/qr-generator.component';
import { ToolsComponent } from './tools/tools.component';
import { GetIpDetailsComponent } from './tools/ip-details/get-ip-details.component';
import { LazyLoadImageModule } from "ng-lazyload-image";

const routes: Routes = [
  {
    path: "",
    component: ResourcesComponent,
    children: [
      {
        path: "links",
        component: LinksComponent,
      },
      {
        path: "courses",
        component: CoursesComponent,
      },
      {
        path: "books",
        component: BooksComponent,
      },
      {
        path: "tools",
        // component: ResourcesComponent,
        children: [
          {
            path: "",
            component: ToolsComponent,
          },
          {
            path: "code-generator",
            component: CodeGeneratorComponent,
          },
          {
            path: "qr-generator",
            component: QrGeneratorComponent,
          },

          {
            path:'ip-details',
            component:GetIpDetailsComponent
          }

        ]

      },
    ],
  },
];

@NgModule({
  declarations: [
    ResourcesComponent,
    LinksComponent,
    CoursesComponent,
    BooksComponent,
    ToolsComponent,
    CodeGeneratorComponent,
    QrGeneratorComponent,
    GetIpDetailsComponent
  ],
  imports: [CommonModule, FormsModule, TabsModule,NgxKjuaModule,LazyLoadImageModule, RouterModule.forChild(routes)],
})
export class ResourcesModule { }
