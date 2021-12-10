import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { AppRoutingModule, routedComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HighlightService } from "./shared/services/highlight.service";

import { HomeModule } from "./pages/home/home.module";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { PostsModule } from "./pages/posts/posts.module";
import { CategoriesModule } from "./pages/categories/categories.module";
import { TagsModule } from "./pages/tags/tags.module";

import { LocalStorageService } from "./shared/services/local-storage.service";
import { SnippetsModule } from "./pages/snippets/snippets.module";

import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { SeoService } from "./shared/services/seo.service";

import { ContactComponent } from "./pages/contact/contact.component";
import { ResourcesModule } from "./pages/resources/resources.module";
import { DealsComponent } from "./pages/deals/deals.component";

import { CommanService } from "./shared/services/comman.service";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { AdsenseModule } from "ng2-adsense";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { BrowserStateInterceptor } from "./browserstate.interceptor";
import { SentryErrorHandler } from './error.service';
import { HttpTokenInterceptor } from "./core/interceptors/http.token.interceptor";

@NgModule({
  declarations: [
    ...routedComponents,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    DealsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AdsenseModule.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    NgxUiLoaderModule,
    HomeModule,
    HttpClientModule,
    PostsModule,
    SnippetsModule,
    CategoriesModule,
    TagsModule,
    ResourcesModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    HighlightService,
    LocalStorageService,
    SeoService,
    CommanService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
    // {
    //   provide: ErrorHandler,
    //   useClass: SentryErrorHandler,
    
    // },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
