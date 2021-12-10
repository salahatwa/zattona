import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TermsComponent } from "./pages/terms/terms.component";
import { PrivacyComponent } from "./pages/privacy/privacy.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { VerificationComponent } from "./pages/verification/verification.component";
import { DealsComponent } from "./pages/deals/deals.component";
import { AboutComponent } from "./pages/about/about.component";
import { SitemapComponent } from "./sitemap/sitemap.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/home/home.module").then((m) => m.HomeModule),
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
    path: "snippets",
    loadChildren: () =>
      import("./pages/snippets/snippets.module").then((m) => m.SnippetsModule),
  },
  {
    path: "interview-questions",
    loadChildren: () =>
      import("./pages/questions/questions.module").then((m) => m.QuestionsModule),
  },
  {
    path: "resources",
    loadChildren: () =>
      import("./pages/resources/resources.module").then((m) => m.ResourcesModule),
  },
  
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "sitemap",
    component: SitemapComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "deals",
    component: DealsComponent,
  },
  {
    path: "verify/:token",
    component: VerificationComponent,
  },
  {
    path: "terms",
    component: TermsComponent,
  },
  {
    path: "privacy-policy",
    component: PrivacyComponent,
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
export class AppRoutingModule {}

export const routedComponents = [
  TermsComponent,
  PrivacyComponent,
  PageNotFoundComponent,
  VerificationComponent,
  AboutComponent,
  SitemapComponent,
];
