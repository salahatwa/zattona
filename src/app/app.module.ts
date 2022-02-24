import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { AdsenseModule } from "ng2-adsense";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { environment } from "../environments/environment";
import { AppRoutingModule, routedComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserStateInterceptor } from "./browserstate.interceptor";
import { HttpTokenInterceptor } from "./core/interceptors/http.token.interceptor";
import { CategoriesModule } from "./pages/categories/categories.module";
import { ContactComponent } from "./pages/contact/contact.component";
import { HomeModule } from "./pages/home/home.module";
import { PostsModule } from "./pages/posts/posts.module";
import { ResourcesModule } from "./pages/resources/resources.module";
import { TagsModule } from "./pages/tags/tags.module";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { CommanService } from "./shared/services/comman.service";
import { HighlightService } from "./shared/services/highlight.service";
import { LocalStorageService } from "./shared/services/local-storage.service";
import { SeoService } from "./shared/services/seo.service";



@NgModule({
  declarations: [
    ...routedComponents,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  exports:[],
  bootstrap: [AppComponent],
})
export class AppModule { }
