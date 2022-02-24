import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./pages/contact/contact.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { SiteInfoComponent } from "./pages/site-info/site-info.component";


const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "post",
    loadChildren: () =>
      import("./pages/posts/posts.module").then((m) => m.PostsModule),
  },
  {
    path: "category",
    loadChildren: () =>
      import("./pages/categories/categories.module").then((m) => m.CategoriesModule),
  },
  {
    path: "tag",
    loadChildren: () => import("./pages/tags/tags.module").then((m) => m.TagsModule),
  },

  {
    path: "resources",
    loadChildren: () =>
      import("./pages/resources/resources.module").then((m) => m.ResourcesModule),
  },
  {
    path: "git-tools",
    loadChildren: () =>
      import("./pages/git-tools/git-tools.module").then((m) => m.GitToolsModule),
  },
  {
    path: "contact",
    component: ContactComponent,
  },

  {
    path: "info/:slug",
    component: SiteInfoComponent,
  },
  {
    path: "home",
    redirectTo: "",
    pathMatch: "full",
  },
  { path: "404", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      enableTracing: false,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [
  SiteInfoComponent,
  PageNotFoundComponent
];
