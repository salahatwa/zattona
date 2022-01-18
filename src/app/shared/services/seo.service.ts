import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Constants } from "../helpers/constants";
@Injectable({
  providedIn: "root",
})
export class SeoService {


  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    @Inject(DOCUMENT) private dom,
  ) { }

  setMetaTags(config?: any) {
    config = {
      title: Constants.SITE_TITLE,
      description: Constants.SITE_DESC,
      image: config?.image ? `${config?.image}` : Constants.DEFAULT_IMG,
      url: `${this.dom.location.origin}${this.router.url}`,
      ...config,
    };

    // Set title
    this.title.setTitle(config?.title);

    // Google
    this.meta.updateTag({ name: "Description", content: config.description });

    // Twitter
    this.meta.updateTag({ name: "twitter:card", content: "summary" });
    this.meta.updateTag({ name: "twitter:site", content: `${Constants.SITE_TAG}` });
    this.meta.updateTag({ name: "twitter:creator", content: `${Constants.SITE_TAG}` });
    this.meta.updateTag({ name: "twitter:title", content: config.title });
    this.meta.updateTag({ name: "twitter:description", content: config.description });
    this.meta.updateTag({ name: "twitter:image", content: config.image });
    this.meta.updateTag({ name: "twitter:image:alt", content: config.title });
    this.meta.updateTag({ name: "twitter:label1", content: "Est. reading time" });
    this.meta.updateTag({ name: "twitter:data1", content: "10 minutes" });

    // Facebook and other social sites
    this.meta.updateTag({ property: "og:type", content: "article" });
    this.meta.updateTag({ property: "og:site_name", content: Constants.SITE_TITLE });
    this.meta.updateTag({ property: "og:title", content: config.title });
    this.meta.updateTag({
      property: "og:description",
      content: config.description,
    });
    this.meta.updateTag({ property: "og:image", content: config.image });
    this.meta.updateTag({ property: "og:url", content: config.url });
    /*  this.meta.updateTag({
       property: "fb:app_id",
       content: `your-facebook-app-id`,
     }); */
  }

  createLinkForCanonicalURL(url) {
    const head = this.dom.getElementsByTagName('head')[0];
    var element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical')
    element.setAttribute('href', url)
  }
}
